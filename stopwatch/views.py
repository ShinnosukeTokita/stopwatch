from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import LoginSerializer, SignUpSerializer


@ensure_csrf_cookie
def CsrfView(request):
    return JsonResponse({"token": request.COOKIES["csrftoken"]})


def PingView(request):
    return JsonResponse({"result": True})


class SignUpView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        print(request.data)
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = request.data.get("email")
            if User.objects.filter(email=email).exists():
                return Response({"error": 3}, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except Exception as e:
                return Response(
                    {"error": 11, "message": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data["user"]
            email = user.email
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "detail": "ログインが成功しました。",
                    "error": 0,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "email": email,
                }
            )
        return Response({"error": 1}, status=status.HTTP_400_BAD_REQUEST)
