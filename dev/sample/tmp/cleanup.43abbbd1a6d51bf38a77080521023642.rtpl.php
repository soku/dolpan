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
    <script type="text/javascript" src="../lib/jQuery.stringify.js"></script>
    <script type="text/javascript" src="../lib/dolpan.js"></script>
		<script src="./bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript">
      var dom;
      function onSiliverlightLoaded(obj)
      {
        dom = $("#htmldom")[0];

        cleanup = function(html)
        {
          if(!dom) return false;
          return "";
        }

        if(dom)
        {
          $.get("../lib/sl/config.json?id"+Math.random(), function(data){
            dom.content.stonyparkdom.setOption(data);

            d = new dolpan("dolpan", "100%", 600);

            d.onInitload = function(){
              dom.content.stonyparkdom.loadHtml($("#orginal_src").val());
              dom.content.stonyparkdom.clean();

              var html = dom.content.stonyparkdom.getHtml(false);
              d.put_htmlText(html);  
            };
          }, "html");

        }
      }

      window.onload = function(){

        $(".cleanBtn").click(function(){
          window.location.href = "./cleanup.php?id=<?php echo $idx;?>";

        });

        $(".saveBtn").click(function(){
          $("#contents").val(d.get_html());
          $("#frmResult").submit();  
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

      #orginal_src {width: 0; height: 0; display: none;}
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
            <div id="resultTD">
              <div id="dolpan"></div>
                <object id="htmldom" data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="0" height="0">
                  <param name="source" value="../lib/sl/htmldom_sl.xap"/>
                  <param name="onLoad" value="onSiliverlightLoaded" />
                  <param name="onError" value="onSilverlightError" />
                  <param name="background" value="white" />
                  <param name="minRuntimeVersion" value="5.0.61118.0" />
                  <param name="autoUpgrade" value="true" />
                  <a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=5.0.61118.0" style="text-decoration:none">
                    <img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight" style="border-style:none"/>
                  </a>
                </object>
                <textarea id="orginal_src"><?php echo $contents;?></textarea>
            </div>
          </td>
          </tr>
        </table>
        <p class="text-center">
          <input type="button" class="btn btn-primary saveBtn" value="저장하기" />
        </p>
        </div><!--/span-->
      </div><!--/row-->

      <hr>
      <form name="frmResult" id="frmResult" method="post" action="./cleanup_result?id=<?php echo $idx;?>">
          <input type="hidden" name="contents" id="contents" />
      </form>
      <footer>
        <p>&copy; STONYPARK 2013</p>
      </footer>
      <script type="text/javascript">
       
        

        

      </script>
    </div>
	</body>
</html>
