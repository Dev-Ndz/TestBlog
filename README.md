# Blog-site

by Hazar & Nicolas

## Installation

### front-end

In order to run the front-end, you'll need to install angular with :

```
npm install -g @angular/cli
```

Route::post('/auth/register', [UserController::class, 'register']);
{
    name
    email
    password(min 6 char)
    password_confirmation (same as password)
    userType:"admin" / "user"
}
return : confirm message

Route::post('/auth/login', [UserController::class, 'login']);
{
    email
    password
}

return {message token}


Route::post('/auth/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

nothing to send

// User routes
Route::middleware(['auth:sanctum', 'userMiddleware'])->group(function() {
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{id}', [BlogController::class, 'show'])->name('blogs.show');
Route::get('/categories/{id}/blogs', [BlogController::class, 'getBlogsByCategory'])->name('blogs.category');
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
});

// Admin routes

Route::middleware(['auth:sanctum', 'adminMiddleware'])->group(function() {
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{id}', [BlogController::class, 'show'])->name('blogs.show');
Route::get('/categories/{id}/blogs', [BlogController::class, 'getBlogsByCategory'])->name('blogs.category');
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store');

{title, content category_id, image(the actual image)} - via form-data

Route::put('/blogs/{id}', [BlogController::class, 'update'])->name('blogs.update');
Route::delete('/blogs/{id}', [BlogController::class, 'delete'])->name('blogs.delete');
Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');

{name:"IT"}
return name, id, date

Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('/categories/{id}', [CategoryController::class, 'delete'])->name('categories.delete');

});
