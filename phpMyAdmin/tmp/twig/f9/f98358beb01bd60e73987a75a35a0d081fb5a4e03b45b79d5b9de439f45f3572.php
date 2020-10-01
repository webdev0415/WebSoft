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

/* server/replication/slave_configuration.twig */
class __TwigTemplate_cbfe361de2968c6d244a254a70f834692a326cfdf93288649f2f02a3f82c218c extends \Twig\Template
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
        echo "<fieldset>
  <legend>";
        // line 2
        echo _gettext("Slave replication");
        echo "</legend>
  ";
        // line 3
        if (($context["server_slave_multi_replication"] ?? null)) {
            // line 4
            echo "    ";
            echo _gettext("Master connection:");
            // line 5
            echo "    <form method=\"get\" action=\"server_replication.php\">
      ";
            // line 6
            echo PhpMyAdmin\Url::getHiddenInputs(($context["url_params"] ?? null));
            echo "
      <select name=\"master_connection\">
        <option value=\"\">";
            // line 8
            echo _gettext("Default");
            echo "</option>
        ";
            // line 9
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["server_slave_multi_replication"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["server"]) {
                // line 10
                echo "          <option value=\"";
                echo twig_escape_filter($this->env, (($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 = $context["server"]) && is_array($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4) || $__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 instanceof ArrayAccess ? ($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4["Connection_name"] ?? null) : null), "html", null, true);
                echo "\"";
                echo (((($context["master_connection"] ?? null) == (($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 = $context["server"]) && is_array($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144) || $__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 instanceof ArrayAccess ? ($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144["Connection_name"] ?? null) : null))) ? (" selected") : (""));
                echo ">
            ";
                // line 11
                echo twig_escape_filter($this->env, (($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b = $context["server"]) && is_array($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b) || $__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b instanceof ArrayAccess ? ($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b["Connection_name"] ?? null) : null), "html", null, true);
                echo "
          </option>
        ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['server'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 14
            echo "      </select>
      <input id=\"goButton\" class=\"btn btn-primary\" type=\"submit\" value=\"";
            // line 15
            echo _gettext("Go");
            echo "\">
    </form>
    <br>
    <br>
  ";
        }
        // line 20
        echo "
  ";
        // line 21
        if (($context["server_slave_status"] ?? null)) {
            // line 22
            echo "    <div id=\"slave_configuration_gui\">
      ";
            // line 23
            if ( !($context["slave_sql_running"] ?? null)) {
                // line 24
                echo "        ";
                echo call_user_func_array($this->env->getFilter('error')->getCallable(), [_gettext("Slave SQL Thread not running!")]);
                echo "
      ";
            }
            // line 26
            echo "      ";
            if ( !($context["slave_io_running"] ?? null)) {
                // line 27
                echo "        ";
                echo call_user_func_array($this->env->getFilter('error')->getCallable(), [_gettext("Slave IO Thread not running!")]);
                echo "
      ";
            }
            // line 29
            echo "
      <p>";
            // line 30
            echo _gettext("Server is configured as slave in a replication process. Would you like to:");
            echo "</p>
      <ul>
        <li>
          <a href=\"#slave_status_href\" id=\"slave_status_href\">";
            // line 33
            echo _gettext("See slave status table");
            echo "</a>
          ";
            // line 34
            echo ($context["slave_status_table"] ?? null);
            echo "
        </li>
        <li>
          <a href=\"#slave_control_href\" id=\"slave_control_href\">";
            // line 37
            echo _gettext("Control slave:");
            echo "</a>
          <div id=\"slave_control_gui\" class=\"hide\">
            <ul>
              <li>
                <a href=\"server_replication.php\" data-post=\"";
            // line 41
            echo twig_escape_filter($this->env, ($context["slave_control_full_link"] ?? null), "html", null, true);
            echo "\">
                  ";
            // line 42
            echo ((( !($context["slave_io_running"] ?? null) ||  !($context["slave_sql_running"] ?? null))) ? ("Full start") : ("Full stop"));
            echo "
                </a>
              </li>
              <li>
                <a class=\"ajax\" id=\"reset_slave\" href=\"server_replication.php\" data-post=\"";
            // line 46
            echo twig_escape_filter($this->env, ($context["slave_control_reset_link"] ?? null), "html", null, true);
            echo "\">
                  ";
            // line 47
            echo _gettext("Reset slave");
            // line 48
            echo "                </a>
              </li>
              <li>
                <a href=\"server_replication.php\" data-post=\"";
            // line 51
            echo twig_escape_filter($this->env, ($context["slave_control_sql_link"] ?? null), "html", null, true);
            echo "\">
                  ";
            // line 52
            if ( !($context["slave_sql_running"] ?? null)) {
                // line 53
                echo "                    ";
                echo _gettext("Start SQL Thread only");
                // line 54
                echo "                  ";
            } else {
                // line 55
                echo "                    ";
                echo _gettext("Stop SQL Thread only");
                // line 56
                echo "                  ";
            }
            // line 57
            echo "                </a>
              </li>
              <li>
                <a href=\"server_replication.php\" data-post=\"";
            // line 60
            echo twig_escape_filter($this->env, ($context["slave_control_io_link"] ?? null), "html", null, true);
            echo "\">
                  ";
            // line 61
            if ( !($context["slave_io_running"] ?? null)) {
                // line 62
                echo "                    ";
                echo _gettext("Start IO Thread only");
                // line 63
                echo "                  ";
            } else {
                // line 64
                echo "                    ";
                echo _gettext("Stop IO Thread only");
                // line 65
                echo "                  ";
            }
            // line 66
            echo "                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href=\"#slave_errormanagement_href\" id=\"slave_errormanagement_href\">
            ";
            // line 73
            echo _gettext("Error management:");
            // line 74
            echo "          </a>
          <div id=\"slave_errormanagement_gui\" class=\"hide\">
            ";
            // line 76
            echo call_user_func_array($this->env->getFilter('error')->getCallable(), [_gettext("Skipping errors might lead into unsynchronized master and slave!")]);
            echo "
            <ul>
              <li>
                <a href=\"server_replication.php\" data-post=\"";
            // line 79
            echo twig_escape_filter($this->env, ($context["slave_skip_error_link"] ?? null), "html", null, true);
            echo "\">
                  ";
            // line 80
            echo _gettext("Skip current error");
            // line 81
            echo "                </a>
              </li>
              <li>
                <form method=\"post\" action=\"server_replication.php\">
                  ";
            // line 85
            echo PhpMyAdmin\Url::getHiddenInputs("", "");
            echo "
                  ";
            // line 86
            echo sprintf(_gettext("Skip next %s errors."), "<input type=\"text\" name=\"sr_skip_errors_count\" value=\"1\" class=\"repl_gui_skip_err_cnt\">");
            echo "
                  <input class=\"btn btn-primary\" type=\"submit\" name=\"sr_slave_skip_error\" value=\"";
            // line 87
            echo _gettext("Go");
            echo "\">
                  <input type=\"hidden\" name=\"sr_take_action\" value=\"1\">
                </form>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href=\"server_replication.php\" data-post=\"";
            // line 95
            echo twig_escape_filter($this->env, ($context["reconfigure_master_link"] ?? null), "html", null, true);
            echo "\">
            ";
            // line 96
            echo _gettext("Change or reconfigure master server");
            // line 97
            echo "          </a>
        </li>
      </ul>
    </div>
  ";
        } elseif ( !        // line 101
($context["has_slave_configure"] ?? null)) {
            // line 102
            echo "    ";
            ob_start(function () { return ''; });
            // line 106
            echo "      ";
            echo _gettext("This server is not configured as slave in a replication process. Would you like to %sconfigure%s it?");
            // line 107
            echo "    ";
            $___internal_18ab9cb6ba2fdef503fea576def3e6698e544231ab7c7a91ab9b9a9e2cd7c493_ = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 102
            echo sprintf($___internal_18ab9cb6ba2fdef503fea576def3e6698e544231ab7c7a91ab9b9a9e2cd7c493_, (("<a href=\"server_replication.php\" data-post=\"" . PhpMyAdmin\Url::getCommon(twig_array_merge(($context["url_params"] ?? null), ["sl_configure" => true, "repl_clear_scr" => true]))) . "\">"), "</a>");
            // line 108
            echo "  ";
        }
        // line 109
        echo "</fieldset>
";
    }

    public function getTemplateName()
    {
        return "server/replication/slave_configuration.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  286 => 109,  283 => 108,  281 => 102,  278 => 107,  275 => 106,  272 => 102,  270 => 101,  264 => 97,  262 => 96,  258 => 95,  247 => 87,  243 => 86,  239 => 85,  233 => 81,  231 => 80,  227 => 79,  221 => 76,  217 => 74,  215 => 73,  206 => 66,  203 => 65,  200 => 64,  197 => 63,  194 => 62,  192 => 61,  188 => 60,  183 => 57,  180 => 56,  177 => 55,  174 => 54,  171 => 53,  169 => 52,  165 => 51,  160 => 48,  158 => 47,  154 => 46,  147 => 42,  143 => 41,  136 => 37,  130 => 34,  126 => 33,  120 => 30,  117 => 29,  111 => 27,  108 => 26,  102 => 24,  100 => 23,  97 => 22,  95 => 21,  92 => 20,  84 => 15,  81 => 14,  72 => 11,  65 => 10,  61 => 9,  57 => 8,  52 => 6,  49 => 5,  46 => 4,  44 => 3,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/replication/slave_configuration.twig", "/var/www/html/frontend/dist/phpMyAdmin/templates/server/replication/slave_configuration.twig");
    }
}
