from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import TokenObtainView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('accounts.urls')),
    path('blog/', include('blog.urls')),
    path('api/', include('api.urls')),
    path('api-token-auth/', TokenObtainView.as_view(), name='api-token-auth'),
    # path('api-token-auth/', TokenObtainPairView.as_view(), name='api-token-auth'),
    path('api-token-refresh/', TokenRefreshView.as_view(), name='api-token-refresh'),
    path('api-auth/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

