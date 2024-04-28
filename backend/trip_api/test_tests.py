from django.test import TestCase
from trip_api.models import Trip

class TripModelTest(TestCase):
    def test_trip_creation(self):
        trip = Trip.objects.create(
            destination='New York',
            start_date='2022-01-01',
            end_date='2022-01-10',
            description='A trip to New York City'
        )
        self.assertEqual(trip.destination, 'New York')
        self.assertEqual(trip.start_date, '2022-01-01')
        self.assertEqual(trip.end_date, '2022-01-10')
        self.assertEqual(trip.description, 'A trip to New York City')