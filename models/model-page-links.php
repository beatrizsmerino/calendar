<?php

class PageLinks{
    public static function pageLinksModel($link){
        $linksHeader = ['calendar-1',
                        'calendar-2',
                        'calendar-3'];
                        
        $linksHeaderKey = array_search($link, $linksHeader);

        if($linksHeader[$linksHeaderKey] == $link){
            $module = 'views/modules/'.$link.'.php';
        }else if($link == "index"){
            $module = 'views/modules/calendar-1.php';
        }else{
            $module = 'views/modules/calendar-1.php';
        }
        return $module;
    }
}
