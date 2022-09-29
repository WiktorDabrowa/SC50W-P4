
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("<str:user_id>", views.profile_page, name="profile"),
    path("<str:user_id>/unfollow", views.unfollow, name="unfollow"),
    path("<str:user_id>/follow", views.follow, name="follow")
]
