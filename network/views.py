from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Post
from .forms import PostForm


def index(request):
    post_form = PostForm()
    
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.poster = request.user
            form.save()
            print('Succes')
            return HttpResponseRedirect(reverse("index")) 
            
    posts = Post.objects.all()
    context = {
       'post_form': post_form,
       'posts': posts
    }
    return render(request, "network/index.html", context)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def profile_page(request, user_id):
    user = User.objects.get(id=user_id)
    followers = len(user.followers.all())
    following = len(user.is_following.all())
    posts = user.posts.all()
    if request.method == 'PUT':
        print('Here')
        return HttpResponse(status=204)
    if request.user in user.followers.all():
        follow = True
    else:
        follow = False
    context = {
        'user':user,
        'followers':followers,
        'following':following,
        'posts':posts,
        'follow':follow,
    }
    return render(request, 'network/profile.html', context)

def follow(request,user_id):
    if request.method == 'PUT':
        following = request.user
        followed = User.objects.get(id = user_id)
        followed.followers.add(following)
        following.is_following.add(followed)
        return 
def unfollow(request,user_id):
    if request.method == 'PUT':
        following = request.user
        followed = User.objects.get(id = user_id)
        followed.followers.remove(following)
        following.is_following.remove(followed)