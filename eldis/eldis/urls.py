"""
URL Configuration for the eldis project.

This module defines the URL routing for the entire project:
- admin/: Django admin interface for site management
- o/: OAuth2 provider endpoints for authentication

For more information on Django URL configuration:
https://docs.djangoproject.com/en/stable/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('users/', include('users.urls')),
]
