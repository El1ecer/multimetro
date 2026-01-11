from django.urls import path
from . import views
app_name = 'simuladores'
urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('multimetro/', views.multimetro, name='multimetro'),
]
