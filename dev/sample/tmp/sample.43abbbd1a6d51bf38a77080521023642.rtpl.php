<?php if(!class_exists('raintpl')){exit;}?><!DOCTYPE html>
<html>
	<head>
		<title>STONYPARK TITLE</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
			<script src="./bootstrap/js/html5shiv.js"></script>
		<![endif]-->
    <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="./img/demo.css" rel="stylesheet" media="screen">
		<script type="text/javascript" src="../lib/jquery-1.9.1.js"></script>
		<script src="./bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript">
      window.onload = function(){
        $(".cleanBtn").click(function(){
          window.location.href = "./cleanup.php?id=<?php echo $idx;?>";

        })
      }

    </script>
		<style type="text/css">
			@font-face{font-family:NG;src:url(./lib/NanumGothic.eot);src:local(※),url(./lib/NanumGothic.woff) format('woff')}

			body {
				padding-top: 60px;
				padding-bottom: 40px;
			}

			body * {font-family:"나눔고딕", NG, sans-serif;}
			.sidebar-nav {
			padding: 9px 0;
			}

			@media (max-width: 980px) {
				/* Enable use of floated navbar text */
				.navbar-text.pull-right {
				float: none;
				padding-left: 5px;
				padding-right: 5px;
				}
			}
		</style>
		<link href="./bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	</head>
	<body>

	<div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand" href="#">WEB STANDARD&amp;KWGC</a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li><a href="./">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row-fluid">
        <div class="span3">
          <?php $tpl = new RainTPL;$tpl_dir_temp = self::$tpl_dir;$tpl->assign( $this->var );$tpl->draw( dirname("leftnav") . ( substr("leftnav",-1,1) != "/" ? "/" : "" ) . basename("leftnav") );?>
        </div><!--/span-->
        <div class="span9">
        <p class="text-center">
          <input type="button" class="btn btn-primary cleanBtn" value="클린업 실행하기" />
        </p>
        <table class="<?php echo $src;?>">
          <tr>
          <th>제목</th>
          <td colspan="3"><?php echo $title;?></td>
          </tr>
          <tr>
          <th>등록자</th>
          <td><?php echo $writer;?></td>
          <th>등록일</th>
          <td><?php echo ( substr( $regDate, 0,10 ) );?></td>
          </tr>
          <tr>
          <th>소속</th>
          <td><?php echo $team;?></td>
          <th>연락처</th>
          <td><?php echo $tel;?></td>
          </tr>
          <tr>
          <th>내용</th>
          <td colspan="3">
          <div id="resultTD"><?php echo $contents;?></div>
          </td>
          </tr>
        </table>
        <p class="text-center">
          <input type="button" class="btn btn-primary cleanBtn" value="클린업 실행하기" />
        </p>
        </div><!--/span-->
      </div><!--/row-->

      <hr>

      <footer>
        <p>&copy; STONYPARK 2013</p>
      </footer>

    </div>
	</body>
</html>
