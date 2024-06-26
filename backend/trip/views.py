from django.contrib.auth.decorators import login_required

from django.http import Http404
from django.shortcuts import render,redirect

from .models import Trip

from django.contrib.auth import authenticate,login,logout
from .forms import SignupForm, TripForm,LoginForm


def home(request):
    return render(request,"home.html")

def trip(request):
    try:
        trips = Trip.objects.order_by("starting_time")
        context = {"trips": trips}
    except Trip.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request,"trips/index.html", context)

# 
def mytrips(request, username):
    trips = Trip.objects.filter(user__username=username).order_by("starting_time")
    if not trips.exists():
        raise Http404(f"No trips available for username: {username}")
    context = {"trips": trips}
    return render(request, "trips/mytrips.html", context)
# 

   
def detail(request, slug):
    trips = Trip.objects.order_by("starting_time").filter(slug=slug)
    context = {'trips': trips}
    return render(request,"trips/description.html", context)


def user_signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Log the user in
            return redirect('home')  # Redirect to a home page or some other page
    else:
        form = SignupForm()
    return render(request, 'registration/signup.html', {'form': form})


def registration(request):
    if request.user.is_authenticated:
        # The user is authenticated, proceed with view logic
        return redirect('home')
    else:
        # The user is not authenticated, redirect to login page or another action
        return redirect('signup')  
    
    
def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            # Using authenticate with email; this relies on your custom backend to handle email auth.
            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)    
                return redirect('home')  # Make sure 'home' is the name of your home page's URL pattern
    else:
        form = LoginForm()
    return render(request, 'registration/signin.html', {'form': form})

def logout_view(request):
    logout(request)
    # Redirect to a success page, such as the homepage or the login page.
    return redirect('user_login')  # Replace 'login' with the name of your login page


# @login_required
def add_trip(request):
    if request.method == 'POST':
        form = TripForm(request.POST)
        if form.is_valid():
            trip = form.save(commit=False)  # Save the form returning an object without committing to the database
            trip.user = request.user  # Assign the logged-in user to the user field of the trip
            trip.save()  # Now save the trip to the database
            return redirect("trips")  # Adjust the redirect to your needs
    else:
        form = TripForm()
    return render(request, 'add_trip.html', {'form': form})


@login_required
def trip_edit(request,slug):
    # Attempt to fetch the user's profile, or create one if it doesn't exist
    trip, created = Trip.objects.get_or_create(slug=slug)
    
    if request.method == 'POST':
        form = TripForm(request.POST, instance=trip)
        if form.is_valid():
            form.save()
            return redirect('trips')  # Adjust the redirect as needed
    else:
        form = TripForm(instance=trip)
    
    return render(request, 'trips/trip_edit.html', {'form': form})