<?php

class MvcController{
    public function template(){
        include 'views/template.php';
    }

    public function pageLinksController(){

        if(isset($_GET['action'])){
            $link = $_GET['action'];
        }else{
            $link = 'index';
        }
        
        $request = PageLinks::pageLinksModel($link);
        include $request;
    }
}

?>