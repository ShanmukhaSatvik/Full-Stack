<?php
require_once 'db.php';
$filter = isset($_GET['category']) ? $_GET['category'] : '';
$sql = $filter ? 
    "SELECT * FROM products WHERE category = ?" : 
    "SELECT * FROM products";

$stmt = $conn->prepare($sql);
if ($filter) {
    $stmt->bind_param("s", $filter);
}
$stmt->execute();
$result = $stmt->get_result();
$cat_result = $conn->query("SELECT DISTINCT category FROM products");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Product Catalog</title>
</head>
<body>
  <h2>Product Catalog</h2>
  <form method="GET" action="">
    <label>Filter by Category:</label>
    <select name="category" onchange="this.form.submit()">
      <option value="">All</option>
      <?php while ($cat = $cat_result->fetch_assoc()): ?>
        <option value="<?= $cat['category'] ?>" <?= $filter == $cat['category'] ? 'selected' : '' ?>>
          <?= $cat['category'] ?>
        </option>
      <?php endwhile; ?>
    </select>
  </form>
  <table border="1" cellpadding="10">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Price ($)</th>
      <th>Category</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()): ?>
    <tr>
      <td><?= $row['id'] ?></td>
      <td><?= htmlspecialchars($row['name']) ?></td>
      <td><?= $row['price'] ?></td>
      <td><?= $row['category'] ?></td>
    </tr>
    <?php endwhile; ?>
  </table>

  <br><a href="insert.php">Add New Product</a>
</body>
</html>
