
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
import json
from django.core.paginator import Paginator

from .models import User, Post
from .forms import PostForm

def index(request):
    post_form = PostForm()
    # Proccesing new posts
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.poster = request.user
            form.save()
            print('Succes')
            return HttpResponseRedirect(reverse("index")) 
            
    posts = Post.objects.all().order_by('-timestamp')
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
       'post_form': post_form,
       'page_obj': page_obj
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
    posts = user.posts.all().order_by('-timestamp')
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    # Checking to see if follow button should be displayed
    same_user = False
    if request.user == user:
        same_user = True
    # Checking if requesting user is already following 
    if request.user in user.followers.all():
        follow = True
    else:
        follow = False
    context = {
        'user':user,
        'followers':followers,
        'following':following,
        'follow':follow,
        'same_user': same_user,
        'page_obj':page_obj
    }
    # Follow/Unfollow:
    if request.method == 'PUT':
        data = json.loads(request.body)
        follower = request.user
        if data['follow'] == False:
            # Adding selected user to your is_following list
            # and your account to his followers list
            user.followers.add(request.user)
            follower.is_following.add(user)
        else:
            # Removing selected user to your is_following list
            # and your account to his followers list
            user.followers.remove(request.user)
            follower.is_following.remove(user)
        return render(request, 'network/profile.html', context)
    return render(request, 'network/profile.html', context)

def following(request):
    post_form = PostForm()
    # Proccesing new posts
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.poster = request.user
            form.save()
            print('Succes')
            return HttpResponseRedirect(reverse("index"))
        
    user = request.user
    following = user.is_following.all()
    posts = Post.objects.filter(poster__in=following).order_by('-timestamp')
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        'post_form': post_form,
        'page_obj': page_obj
    }
    return render(request,'network/index.html', context)

def edit(request,post_id):
    post = Post.objects.get(id=post_id)
    if request.user == post.poster:
        data = json.loads(request.body)
        post.body = data['body']
        post.save()
        return HttpResponseRedirect(reverse("index")) 
    else:
        return JsonResponse({'body': 'false'})