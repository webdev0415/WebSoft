<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* preferences/manage/main.twig */
class __TwigTemplate_7ba62dcfef290e4e4aa6ad3bbf146845df0fee8177b39d5fc07e6d50cd5b6e0a extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo ($context["error"] ?? null);
        echo "
<script type=\"text/javascript\">
    ";
        // line 3
        echo PhpMyAdmin\Sanitize::getJsValue("Messages.strSavedOn", _gettext("Saved on: @DATE@"));
        echo "
</script>
<div id=\"maincontainer\">
    <div id=\"main_pane_left\">
        <div class=\"group\">
            <h2> ";
        // line 8
        echo _gettext("Import");
        echo " </h2>
            <form class=\"group-cnt prefs-form disableAjax\" name=\"prefs_import\" action=\"prefs_manage.php\" method=\"post\"
                  enctype=\"multipart/form-data\">
                ";
        // line 11
        echo PhpMyAdmin\Util::generateHiddenMaxFileSize(($context["max_upload_size"] ?? null));
        echo "
                ";
        // line 12
        echo PhpMyAdmin\Url::getHiddenInputs();
        echo "
                <input type=\"hidden\" name=\"json\" value=\"\">
                <input type=\"radio\" id=\"import_text_file\" name=\"import_type\" value=\"text_file\" checked=\"checked\">
                <label for=\"import_text_file\"> ";
        // line 15
        echo _gettext("Import from file");
        echo " </label>
                <div id=\"opts_import_text_file\" class=\"prefsmanage_opts\">
                    <label for=\"input_import_file\"> ";
        // line 17
        echo _gettext("Browse your computer:");
        echo " </label>
                    <input type=\"file\" name=\"import_file\" id=\"input_import_file\">
                </div>
                <input type=\"radio\" id=\"import_local_storage\" name=\"import_type\" value=\"local_storage\"
                       disabled=\"disabled\">
                <label for=\"import_local_storage\"> ";
        // line 22
        echo _gettext("Import from browser's storage");
        echo " </label>
                <div id=\"opts_import_local_storage\" class=\"prefsmanage_opts disabled\">
                    <div class=\"localStorage-supported\">
                        ";
        // line 25
        echo _gettext("Settings will be imported from your browser's local storage.");
        // line 26
        echo "                        <br>
                        <div class=\"localStorage-exists\">
                            ";
        // line 28
        echo _gettext("Saved on: @DATE@");
        // line 29
        echo "                        </div>
                        <div class=\"localStorage-empty\">
                            ";
        // line 31
        echo call_user_func_array($this->env->getFilter('notice')->getCallable(), [_gettext("You have no saved settings!")]);
        echo "
                        </div>
                    </div>
                    <div class=\"localStorage-unsupported\">
                        ";
        // line 35
        echo call_user_func_array($this->env->getFilter('notice')->getCallable(), [_gettext("This feature is not supported by your web browser")]);
        echo "
                    </div>
                </div>
                <input type=\"checkbox\" id=\"import_merge\" name=\"import_merge\">
                <label for=\"import_merge\"> ";
        // line 39
        echo _gettext("Merge with current configuration");
        echo " </label>
                <br><br>
                <input class=\"btn btn-primary\" type=\"submit\" name=\"submit_import\" value=\"";
        // line 41
        echo twig_escape_filter($this->env, _gettext("Go"), "html", null, true);
        echo "\">
            </form>
        </div>
        ";
        // line 44
        if (($context["exists_setup_and_not_exists_config"] ?? null)) {
            // line 45
            echo "            ";
            // line 46
            echo "            ";
            // line 47
            echo "            ";
            // line 48
            echo "            <div class=\"group\">
                <h2>";
            // line 49
            echo _gettext("More settings");
            echo "</h2>
                <div class=\"group-cnt\">
                    ";
            // line 51
            echo sprintf(_gettext("You can set more settings by modifying config.inc.php, eg. by using %sSetup script%s."), "<a href=\"setup/index.php\" target=\"_blank\">", "</a>");
            echo "
                    ";
            // line 52
            echo PhpMyAdmin\Util::showDocu("setup", "setup-script");
            echo "
                </div>
            </div>
        ";
        }
        // line 56
        echo "    </div>
    <div id=\"main_pane_right\">
        <div class=\"group\">
            <h2>";
        // line 59
        echo _gettext("Export");
        echo "</h2>
            <div class=\"click-hide-message group-cnt hide\">
                ";
        // line 61
        echo call_user_func_array($this->env->getFilter('raw_success')->getCallable(), [_gettext("Configuration has been saved.")]);
        echo "
            </div>
            <form class=\"group-cnt prefs-form disableAjax\" name=\"prefs_export\"
                  action=\"prefs_manage.php\" method=\"post\">
                ";
        // line 65
        echo PhpMyAdmin\Url::getHiddenInputs();
        echo "
                <div>
                    <input type=\"radio\" id=\"export_text_file\" name=\"export_type\"
                           value=\"text_file\" checked=\"checked\">
                    <label for=\"export_text_file\">
                        ";
        // line 70
        echo _gettext("Save as JSON file");
        // line 71
        echo "                    </label><br>
                    <input type=\"radio\" id=\"export_php_file\" name=\"export_type\" value=\"php_file\">
                    <label for=\"export_php_file\">
                        ";
        // line 74
        echo _gettext("Save as PHP file");
        // line 75
        echo "                    </label><br>
                    <input type=\"radio\" id=\"export_local_storage\" name=\"export_type\" value=\"local_storage\"
                           disabled=\"disabled\">
                    <label for=\"export_local_storage\">
                        ";
        // line 79
        echo _gettext("Save to browser's storage");
        // line 80
        echo "                    </label>
                </div>
                <div id=\"opts_export_local_storage\"
                     class=\"prefsmanage_opts disabled\">
                    <span class=\"localStorage-supported\">
                        ";
        // line 85
        echo _gettext("Settings will be saved in your browser's local storage.");
        // line 86
        echo "                      <div class=\"localStorage-exists\">
                            <b>
                                ";
        // line 88
        echo _gettext("Existing settings will be overwritten!");
        // line 89
        echo "                            </b>
                        </div>
                    </span>
                    <div class=\"localStorage-unsupported\">
                        ";
        // line 93
        echo call_user_func_array($this->env->getFilter('notice')->getCallable(), [_gettext("This feature is not supported by your web browser")]);
        echo "
                    </div>
                </div>
                <br>
                <input class=\"btn btn-primary\" type=\"submit\" name=\"submit_export\" value=\"";
        // line 97
        echo _gettext("Go");
        echo "\">
            </form>
        </div>
        <div class=\"group\">
            <h2>";
        // line 101
        echo _gettext("Reset");
        echo "</h2>
            <form class=\"group-cnt prefs-form disableAjax\" name=\"prefs_reset\"
                  action=\"prefs_manage.php\" method=\"post\">
                ";
        // line 104
        echo PhpMyAdmin\Url::getHiddenInputs();
        echo "
                ";
        // line 105
        echo _gettext("You can reset all your settings and restore them to default values.");
        // line 106
        echo "                <br><br>
                <input class=\"btn btn-secondary\" type=\"submit\" name=\"submit_clear\" value=\"";
        // line 107
        echo _gettext("Reset");
        echo "\">
            </form>
        </div>
    </div>
    <br class=\"clearfloat\">
</div>
";
    }

    public function getTemplateName()
    {
        return "preferences/manage/main.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  241 => 107,  238 => 106,  236 => 105,  232 => 104,  226 => 101,  219 => 97,  212 => 93,  206 => 89,  204 => 88,  200 => 86,  198 => 85,  191 => 80,  189 => 79,  183 => 75,  181 => 74,  176 => 71,  174 => 70,  166 => 65,  159 => 61,  154 => 59,  149 => 56,  142 => 52,  138 => 51,  133 => 49,  130 => 48,  128 => 47,  126 => 46,  124 => 45,  122 => 44,  116 => 41,  111 => 39,  104 => 35,  97 => 31,  93 => 29,  91 => 28,  87 => 26,  85 => 25,  79 => 22,  71 => 17,  66 => 15,  60 => 12,  56 => 11,  50 => 8,  42 => 3,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "preferences/manage/main.twig", "/var/www/html/frontend/dist/phpMyAdmin/templates/preferences/manage/main.twig");
    }
}
