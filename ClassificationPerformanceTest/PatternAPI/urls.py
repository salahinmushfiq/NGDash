from django.contrib import admin
from .views import*
from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns = [

    # path('', root),
    path('', TemplateView.as_view(template_name='index.html')),
    path("pattern/kms/", kms),
    path("pattern/hierarchical/", hierarchical),
    path("dataset/", initial_data_download),
    path("data_cleaning/", initial_data_cleaning),
    path("data_pre_processing/", cleaned_data_pre_processing),
    path("data_scaling/", pre_processed_data_remove_ouliers),
    path("modeled_data/", scaled_data_model_creation),
    path("modeled_data_hierarchical/", get_single_linkage_and_cutting_the_Dendrogram_based_on_K),
    path("wss_plot/", wss_plot_creation),
    path("silhouette_scores/", scaled_data_silhouette_scores)
]
