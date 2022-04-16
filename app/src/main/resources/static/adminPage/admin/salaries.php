<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>Employees</title>
    <style>
      body {
        font-family: Consolas, monospace;
        font-family: 12px;
      }
      table {
        width: 100%;
      }
      th, td {
        padding: 10px;
        border-bottom: 1px solid #dadada;
      }
    </style>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th>first_name</th>
          <th>last_name</th>
          <th>salary</th>
          <th>from_date</th>
          <th>to_date</th>
        </tr>
      </thead>
      <tbody>
        <?php
          $jb_conn = mysqli_connect( 'localhost', 'username', 'password', 'employees' );
          $jb_sql = "SELECT * FROM salaries LEFT JOIN employees ON salaries.emp_no = employees.emp_no LIMIT 20;";
          $jb_result = mysqli_query( $jb_conn, $jb_sql );
          while( $jb_row = mysqli_fetch_array( $jb_result ) ) {
            echo '<tr><td>' . $jb_row[ 'first_name' ] . '</td><td>'. $jb_row[ 'last_name' ] . '</td><td>' . $jb_row[ 'salary' ] . '</td><td>' . $jb_row[ 'from_date' ] . '</td><td>' . $jb_row[ 'to_date' ] . '</td></tr>';
          }
        ?>
      </tbody>
    </table>
  </body>
</html>