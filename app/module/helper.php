<?php


function getCollectionListCase($source_dir, $directory_depth = 0, $hidden = FALSE)
{
    if ($fp = @opendir($source_dir))
    {
        $filedata   = array();
        $new_depth  = $directory_depth - 1;
        $source_dir = rtrim($source_dir, '/').'/';

        while (FALSE !== ($file = readdir($fp)))
        {
            // Remove '.', '..', and hidden files [optional]
            if ( ! trim($file, '.') OR ($hidden == FALSE && $file[0] == '.'))
            {
                continue;
            }

            if (($directory_depth < 1 OR $new_depth > 0) && @is_dir($source_dir.$file))
            {
                $filedata[$file] = getCollectionListCase($source_dir.$file.'/', $new_depth, $hidden);
            }
            else
            {
                $filedata[] = $file;
            }
        }

        closedir($fp);
        return $filedata;
    }
    echo 'can not open dir';
    return FALSE;
}

function getCollectionListGroupInfo($dir, &$results = []) {
    $files = scandir($dir);
    $countFiles = 0;
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);

        if (is_dir($path) && $value != "." && $value != "..") {
            $results[$value] = getCollectionListGroupInfo($path);
        }
    }
    return $results;
}

function getInfoDocument($dir, &$results = []) {
    $files = scandir($dir);
    $countFiles = 0;
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);

        if (is_file($path) && $value != "." && $value != "..") {
            $results[$value] = $value;
        }
    }

    return $results;
}