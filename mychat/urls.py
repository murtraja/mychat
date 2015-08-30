from django.conf.urls import patterns, url
from mychat import views

urlpatterns = patterns('',
    url(r'^$', views.index, name= 'index'),
    url(r'^broadcastpost/$', views.broadcast_post, name = 'broadcast_post'))