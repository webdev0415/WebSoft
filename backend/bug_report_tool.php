<?php

include( "config/bug_report_tool_config.php" );

$installation = new BugReportToolController();
$installation->route();