# Libraries
# ======================================================================================
import urllib

import numpy as np
import pandas as pd
from tqdm import tqdm
import matplotlib.pyplot as plt
import base64
from io import BytesIO
import io
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from scipy.cluster.hierarchy import linkage
from scipy.cluster.hierarchy import dendrogram
from scipy.cluster.hierarchy import cut_tree

plt.style.use('seaborn-v0_8-darkgrid')


def get_graph(plt):
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph


def get_plot(plt):
    plt.switch_backend('AGG')
    plt.title("Sales of Items")
    plt.show()
    graph = get_graph(plt)
    return graph


def data_download():
    data = pd.read_csv('./API/customer_shopping_data.csv')
    print(f"Shape: {data.shape}")
    return data


def data_cleaning(data):
    print('#' * 20)
    print('Cleaned Data')
    print(data.info())
    print(data.shape)
    print(data.isnull().sum())
    cleaned_data = data.dropna()
    return cleaned_data


def monetary(cleaned_data):
    cleaned_data['CustomerID'] = cleaned_data['customer_id'].astype(str)
    cleaned_data['Amount'] = cleaned_data['quantity'] * cleaned_data['price']
    rfm_ds_m = cleaned_data.groupby('CustomerID')['Amount'].sum()
    rfm_ds_m.reset_index()
    rfm_ds_m.columns = ['CustomerID', 'Amount']
    print("======monetary Data=====")
    print(rfm_ds_m)
    return rfm_ds_m


def frequency(cleaned_data):
    rfm_ds_f = cleaned_data.groupby('customer_id')['invoice_no'].count()
    rfm_ds_f = rfm_ds_f.reset_index()
    rfm_ds_f.columns = ['CustomerID', 'Frequency']
    print("======Frequency Data=====")
    print(rfm_ds_f)
    return rfm_ds_f


def recency(cleaned_data):
    cleaned_data['invoice_date'] = pd.to_datetime(cleaned_data['invoice_date'], format='%d/%m/%Y')
    max_date = max(cleaned_data['invoice_date'])
    cleaned_data['Recency'] = max_date - cleaned_data['invoice_date']
    rfm_ds_p = cleaned_data.groupby('customer_id')['Recency'].min()
    rfm_ds_p = rfm_ds_p.reset_index()
    rfm_ds_p.columns = ['CustomerID', 'Recency']
    rfm_ds_p['Recency'] = rfm_ds_p['Recency'].dt.days
    print("======Recency Data=====")
    print(rfm_ds_p)
    return rfm_ds_p


def group_together(rfm_ds_m, rfm_ds_f, rfm_ds_p):
    rfm_ds_final = pd.merge(rfm_ds_m, rfm_ds_f, on='CustomerID', how='inner')
    rfm_ds_final = pd.merge(rfm_ds_final, rfm_ds_p, on='CustomerID', how='inner')
    rfm_ds_final.columns = ['CustomerID', 'Amount', 'Frequency', 'Recency']
    print("======Group Data=====")
    print(rfm_ds_final)
    return rfm_ds_final


def data_pre_processing(cleaned_data):
    # data preprocessing

    rfm_ds_m = monetary(cleaned_data)
    rfm_ds_f = frequency(cleaned_data)
    rfm_ds_p = recency(cleaned_data)
    rfm_ds_final = group_together(rfm_ds_m, rfm_ds_f, rfm_ds_p)
    return rfm_ds_m, rfm_ds_f, rfm_ds_p, rfm_ds_final


def identify(grouped_data):
    Q1 = grouped_data.Amount.quantile(0.05)
    Q3 = grouped_data.Amount.quantile(0.95)
    IQR = Q3 - Q1
    rfm_ds_final = grouped_data[(grouped_data.Amount >= Q1 - 1.5 * IQR) & (grouped_data.Amount <= Q3 + 1.5 * IQR)]

    Q1 = rfm_ds_final.Recency.quantile(0.05)
    Q3 = rfm_ds_final.Recency.quantile(0.95)
    IQR = Q3 - Q1
    rfm_ds_final = rfm_ds_final[(rfm_ds_final.Recency >= Q1 - 1.5 * IQR) & (rfm_ds_final.Recency <= Q3 + 1.5 * IQR)]

    Q1 = rfm_ds_final.Frequency.quantile(0.05)
    Q3 = rfm_ds_final.Frequency.quantile(0.95)
    IQR = Q3 - Q1
    grouped_data = rfm_ds_final[(rfm_ds_final.Frequency >= Q1 - 1.5 * IQR) & (rfm_ds_final.Frequency <= Q3 + 1.5 * IQR)]
    print("======Identified Data=====")
    print(grouped_data.head(4))
    return grouped_data


def scaling(identified_data):
    print("======Scaled Data Check =====")
    print(identified_data)
    X = identified_data[['Amount', 'Frequency', 'Recency']]
    scaler = MinMaxScaler()
    rfm_ds_scaled = scaler.fit_transform(X)
    rfm_ds_scaled = pd.DataFrame(rfm_ds_scaled)
    rfm_ds_scaled.columns = ['Amount', 'Frequency', 'Recency']
    print("======Scaled Data=====")
    print(rfm_ds_scaled.head(4))

    return rfm_ds_scaled


def removeOutliers(grouped_data):
    identified_data = identify(grouped_data)
    # data = pd.DataFrame(identified_data)
    # data.shape()
    # identified_data.shape()
    scaled_data = scaling(identified_data)
    return scaled_data


def modelCreation(scaled_data):
    # model creation
    kmeans = KMeans(n_clusters=3, max_iter=50, n_init='auto')
    kmeans.fit(scaled_data)
    lbs = kmeans.labels_
    return lbs


def single_linkage(scaled_data):
    scaled_data = removeOutliers(scaled_data)
    scaled_data=scaled_data.to_numpy()
    mergings = linkage(scaled_data, method="single", metric='euclidean')
    dendrogram(mergings)
    # plt.show()
    return mergings


def complete_linkage(scaled_data):
    mergings = linkage(scaled_data, method="complete", metric='euclidean')
    dendrogram(mergings)
    # plt.show()
    return mergings


def cutting_the_Dendrogram_based_on_K(scaled_data, mergings):
    cluster_cut = pd.Series(cut_tree(mergings, n_clusters=5).reshape(-1, ))
    rfm_hc = pd.concat([scaled_data, cluster_cut.rename('Cluster_Id')], axis=1,)
    print("######## rfm_hc #################")
    print(rfm_hc)
    rfm_hc.reset_index()
    print(rfm_hc)
    return rfm_hc


# def getCluster1Image(rfm):
#     try:
#         fig, ax = plt.subplots()
#         buf2 = io.BytesIO()
#         plt1 = sns.boxplot(x='Cluster_Id', y='Amount', data=rfm, ax=ax)
#         print("plt1 Type")
#         print(type(plt1))
#         print("rfm Data Type")
#         print(type(rfm))
#         plt.savefig('boxplot1.png')
#         plt.show()
#         print("Type of fig")
#         print(type(fig))
#         buf2.seek(0)
#         string2 = base64.b64encode(buf2.read())
#         uri2 = urllib.parse.quote(string2)
#         print("Type of uri2")
#         print(type(uri2))
#     except Exception as inst:
#         print(type(inst))  # the exception type
#         print(inst.args)  # arguments stored in .args
#         print(inst)
#         print("Oops!  That was no valid number.  Try again...")
#
#
# def getCluster2Image(rfm):
#     fig, ax = plt.subplots()
#     buf2 = io.BytesIO()
#     plt1 = sns.boxplot(x='Cluster_Id', y='Frequency', data=rfm, ax=ax)
#     plt.savefig('boxplot1.png')
#     plt.show()
#
#
# def getCluster3Image(rfm):
#     fig, ax = plt.subplots()
#     buf2 = io.BytesIO()
#     plt1 = sns.boxplot(x='Cluster_Id', y='Recency', data=rfm, ax=ax)
#     plt.savefig('boxplot1.png')
#     plt.show()
