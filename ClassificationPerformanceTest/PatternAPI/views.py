# Create your views here.
from ast import literal_eval

from django.http import JsonResponse
from django.shortcuts import render

from .hierarchical_clustering import *
from .kmeans_clustering import *
from .models import *
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd


@csrf_exempt
def initial_data_download(request):
    data = data_download()
    data = data.head(30000)
    data = data.to_dict('records')
    return JsonResponse({"data": data}, safe=False)


@csrf_exempt
def initial_data_cleaning(request):
    if request.method == 'POST':
        received_data = request.body
        print("data")

        # print(type(received_data))
        # print(received_data)

        data = literal_eval(received_data.decode('utf8'))
        # print(type(data))
        # print(data)

        # print('- ' * 20)

        json_data_array = json.loads(json.dumps(data))

        cleaned_data = data_cleaning(pd.DataFrame(json_data_array))
        data = cleaned_data.to_dict('records')

        return JsonResponse({"response": data}, safe=False)


@csrf_exempt
def cleaned_data_pre_processing(request):
    if request.method == 'POST':
        received_data = request.body
        print("data")

        # print(type(received_data))
        # print(received_data)

        data = literal_eval(received_data.decode('utf8'))
        # print(type(data))
        # print(data)
        # print('- ' * 20)

        json_data_array = json.loads(json.dumps(data))

        rfm_ds_m, rfm_ds_f, rfm_ds_p, rfm_ds_final = data_pre_processing(pd.DataFrame(json_data_array))
        data = rfm_ds_final.to_dict('records')
        return JsonResponse({"response": data}, safe=False)


@csrf_exempt
def pre_processed_data_remove_ouliers(request):
    if request.method == 'POST':
        received_data = request.body
        print("data")
        data = literal_eval(received_data.decode('utf8'))
        json_data_array = json.loads(json.dumps(data))
        scaled_data = removeOutliers(pd.DataFrame(json_data_array))
        data = scaled_data.to_dict('records')
        return JsonResponse({"response": data}, safe=False)


@csrf_exempt
def scaled_data_model_creation(request):
    if request.method == 'POST':
        received_data = request.body
        data = literal_eval(received_data.decode('utf8'))
        json_data_array = json.loads(json.dumps(data))
        scaled_df = pd.DataFrame(json_data_array)
        model_labels = modelCreation(scaled_df)
        scaled_df['Cluster_Id'] = model_labels
        # print(scaled_df['Cluster_Id'])
        data = scaled_df.to_dict('records')
        return JsonResponse({"response": data}, safe=False)


@csrf_exempt
def get_single_linkage_and_cutting_the_Dendrogram_based_on_K(request):
    if request.method == 'POST':
        received_data = request.body
        data = literal_eval(received_data.decode('utf8'))
        json_data_array = json.loads(json.dumps(data))
        scaled_df = pd.DataFrame(json_data_array)
        merging_data = complete_linkage(scaled_df)
        scaled_df = cutting_the_Dendrogram_based_on_K(scaled_df, merging_data)
        # scaled_df['Cluster_Id'] = model_labels
        # print(scaled_df['Cluster_Id'])
        data = scaled_df.to_dict('records')

        return JsonResponse({"response": data}, safe=False)


@csrf_exempt
def wss_plot_creation(request):
    if request.method == 'POST':
        received_data = request.body
        data = literal_eval(received_data.decode('utf8'))
        json_data_array = json.loads(json.dumps(data))
        scaled_df = pd.DataFrame(json_data_array)
        wss_data = wss_plot(scaled_df)
        # scaled_df['Cluster_Id'] = model_labels
        # print(scaled_df['Cluster_Id'])
        data = json.dumps(wss_data)
        return JsonResponse({"response": data}, safe=False)


@csrf_exempt
def scaled_data_silhouette_scores(request):
    if request.method == 'POST':
        received_data = request.body
        data = literal_eval(received_data.decode('utf8'))
        json_data_array = json.loads(json.dumps(data))
        rfm, silhouette_scores, silhouette_scores_int, json_arr = silhouette_score_analysis(
        pd.DataFrame(json_data_array))
        # data = silhouette_scores.to_dict('records')
        data = json.dumps(json_arr)
        print(rfm)

        return JsonResponse({"response": data}, safe=False)


def kms(request):
    # Data download
    # ======================================================================================
    # data = data_download()
    # df = data.head(4).to_json()

    # if loaded from server
    # ======================================================================================
    data = Data.objects.all().values()
    # if read locally
    # ======================================================================================
    data = data_download()
    initial_df = pd.DataFrame(data)
    print("======Initial Data Format=====")
    print(initial_df.head(4))
    cleaned_data = data_cleaning(data)
    print("======Cleaned Data=====")
    print(cleaned_data.info())
    print(cleaned_data.shape)

    print("======Pre-Processed Data=====")
    rfm_ds_m, rfm_ds_f, rfm_ds_p, rfm_ds_final = data_pre_processing(cleaned_data)

    rfm_ds_m_df = pd.DataFrame(rfm_ds_m)
    rfm_ds_f_df = pd.DataFrame(rfm_ds_f)
    rfm_ds_p_df = pd.DataFrame(rfm_ds_p)
    rfm_ds_final_df = pd.DataFrame(rfm_ds_final)

    scaled_data = removeOutliers(rfm_ds_final)

    scaled_data_df = pd.DataFrame(scaled_data)
    cluster_labels = modelCreation(scaled_data)
    scaled_data['Cluster_Id'] = cluster_labels

    wss_plot_img = wss_plot(scaled_data)
    rfm, silhouette_scores, json_arr = silhouette_score_analysis(scaled_data)

    print("======Cluster Data with Labels=====")
    print(scaled_data.head(4))

    scaled_data_labeled_df = pd.DataFrame(scaled_data)
    silhouette_scores_df = pd.DataFrame(silhouette_scores)
    # Box plot to visualize Cluster Id vs Frequency
    getCluster1Image(rfm)
    getCluster2Image(rfm)
    getCluster3Image(rfm)
    # amount_polt_image = getCluster1Image(rfm)
    frequency_plot_image = getCluster2Image(rfm)
    recency_plot_image = getCluster3Image(rfm)

    return render(request, 'index.html',
                  context={
                      "initialData": (initial_df.head(4)).to_html(),
                      "monetaryData": (rfm_ds_m_df.head(4)).to_html(),
                      "frequencyData": (rfm_ds_f_df.head(4)).to_html(),
                      "recencyData": (rfm_ds_p_df.head(4)).to_html(),
                      "groupValuation": (rfm_ds_final_df.head(4)).to_html(),
                      "scaledData": (scaled_data_df.head(4)).to_html(),
                      "img1": wss_plot_img,
                      "scaledLabeledData": (scaled_data_labeled_df.head(4)).to_html(),
                      "silhouette_scores": silhouette_scores_df.to_html(),
                      # "amountPlotImage": amount_polt_image
                  }, )


def hierarchical(request):
    # Data download
    # ======================================================================================
    # data = data_download()
    # df = data.head(4).to_json()

    # if loaded from server
    # ======================================================================================
    data = Data.objects.all().values()
    # if read locally
    # ======================================================================================
    data = data_download()
    data = data.head(1000)
    initial_df = pd.DataFrame(data)
    print("======Initial Data Format=====")
    print(initial_df.head(4))
    cleaned_data = data_cleaning(data)
    print("======Cleaned Data=====")
    print(cleaned_data.info())
    print(cleaned_data.shape)

    print("======Pre-Processed Data=====")
    rfm_ds_m, rfm_ds_f, rfm_ds_p, rfm_ds_final = data_pre_processing(cleaned_data)

    rfm_ds_m_df = pd.DataFrame(rfm_ds_m)
    rfm_ds_f_df = pd.DataFrame(rfm_ds_f)
    rfm_ds_p_df = pd.DataFrame(rfm_ds_p)
    rfm_ds_final_df = pd.DataFrame(rfm_ds_final)

    scaled_data = removeOutliers(rfm_ds_final)

    scaled_data_df = pd.DataFrame(scaled_data)
    cluster_labels = modelCreation(scaled_data)
    # scaled_data['Cluster_Id'] = cluster_labels
    merging_single = single_linkage(scaled_data)
    merging_complete = complete_linkage(scaled_data)
    rfm_hc = cutting_the_Dendrogram_based_on_K(scaled_data, merging_complete)

    return render(request, 'index.html',
                  context={
                      "initialData": (initial_df.head(4)).to_html(),
                      "monetaryData": (rfm_ds_m_df.head(4)).to_html(),
                      "frequencyData": (rfm_ds_f_df.head(4)).to_html(),
                      "recencyData": (rfm_ds_p_df.head(4)).to_html(),
                      "groupValuation": (rfm_ds_final_df.head(4)).to_html(),
                      "scaledData": (scaled_data_df.head(4)).to_html(),
                      # "amountPlotImage": amount_polt_image
                  }, )
