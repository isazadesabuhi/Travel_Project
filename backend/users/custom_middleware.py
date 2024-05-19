from django.utils.deprecation import MiddlewareMixin

class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('jwt')  
        if token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'