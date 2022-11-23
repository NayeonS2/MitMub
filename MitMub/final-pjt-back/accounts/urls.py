from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #path('signup/', views.signup),
    path('get_user/', views.get_user),
    path('profile_list/', views.profile_list),
 
    path('<username>/', views.profile),
    path('<username>/follow/', views.follow),

    path('<username>/my_follow/', views.my_follow),

    path('<username>/check_follow/', views.check_follow),
    path('<username>/follow_num/', views.follow_num),

   
] 
