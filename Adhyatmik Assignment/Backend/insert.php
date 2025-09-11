<?php
require_once 'db.php';
$name = $price = $category = "";
$errors = [];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = trim($_POST["name"]);
  $price = trim($_POST["price"]);
  $category = trim($_POST["category"]);
  if (empty($name)) $errors[] = "Name is required.";
  if (!is_numeric($price)) $errors[] = "Price must be numeric.";
  if (empty($category)) $errors[] = "Category is required.";
  if (empty($errors)) {
    $stmt = $conn->prepare("INSERT INTO products (name, price, category) VALUES (?, ?, ?)");
    $stmt->bind_param("sds", $name, $price, $category);
    $stmt->execute();
    header("Location: index.php");
    exit;
  }
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Add Product</title>
</head>
<body>
  <h2>Add New Product</h2>
  <?php if ($errors): ?>
    <ul style="color: red;">
      <?php foreach ($errors as $e): ?>
        <li><?= $e ?></li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>
  <form method="POST">
    <label>Name:</label><br>
    <input type="text" name="name" value="<?= htmlspecialchars($name) ?>"><br><br>
    <label>Price:</label><br>
    <input type="text" name="price" value="<?= htmlspecialchars($price) ?>"><br><br>
    <label>Category:</label><br>
    <input type="text" name="category" value="<?= htmlspecialchars($category) ?>"><br><br>
    <button type="submit">Add Product</button>
  </form>
  <br>
  <a href="index.php">Back to Catalog</a>
</body>
</html>
