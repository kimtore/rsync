import tastypie.authorization
import tastypie.exceptions


def object_list_with_current_author(object_list, bundle):
    allowed = []

    # Since they may not all be saved, iterate over them.
    for obj in object_list:
        if obj.author == bundle.request.user:
            allowed.append(obj)

    return allowed


class UserObjectsOnlyAuthorization(tastypie.authorization.Authorization):
    """
    @brief Authorization class only allowing access to user's own objects.
    """
    def read_list(self, object_list, bundle):
        return object_list.filter(author=bundle.request.user)

    def read_detail(self, object_list, bundle):
        return bundle.obj.author == bundle.request.user

    def create_list(self, object_list, bundle):
        return object_list

    def create_detail(self, object_list, bundle):
        return bundle.obj.author == bundle.request.user

    def update_list(self, object_list, bundle):
        return object_list_with_current_author(object_list, bundle)

    def update_detail(self, object_list, bundle):
        return bundle.obj.author == bundle.request.user

    def delete_list(self, object_list, bundle):
        return object_list_with_current_author(object_list, bundle)

    def delete_detail(self, object_list, bundle):
        return bundle.obj.author == bundle.request.user
