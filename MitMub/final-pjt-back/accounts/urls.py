from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #path('signup/', views.signup),
    # path('get_user/', views.get_user),
    # path('api-token-auth', obtain_jwt_token),
    # path('<username>/', views.profile),
    # path('<username>/follow/', views.follow),
] 
