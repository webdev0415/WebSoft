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

/* server/replication/index.twig */
class __TwigTemplate_f2b7141be847e082ae6273880d9f6e51edb2a3eecbbcfd628fc7c99025f19f3c extends \Twig\Template
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
        echo "<h2>
  ";
        // line 2
        echo PhpMyAdmin\Util::getImage("s_replication");
        echo "
  ";
        // line 3
        echo _gettext("Replication");
        // line 4
        echo "</h2>

";
        // line 6
        if (($context["is_super_user"] ?? null)) {
            // line 7
            echo "  <div id=\"replication\">
    ";
            // line 8
            echo ($context["error_messages"] ?? null);
            echo "

    ";
            // line 10
            if (($context["is_master"] ?? null)) {
                // line 11
                echo "      ";
                echo ($context["master_replication_html"] ?? null);
                echo "
    ";
            } elseif (((null ===             // line 12
($context["master_configure"] ?? null)) && (null === ($context["clear_screen"] ?? null)))) {
                // line 13
                echo "      <fieldset>
        <legend>";
                // line 14
                echo _gettext("Master replication");
                echo "</legend>
        ";
                // line 15
                ob_start(function () { return ''; });
                // line 16
                echo "          ";
                echo _gettext("This server is not configured as master in a replication process. Would you like to %sconfigure%s it?");
                // line 19
                echo "        ";
                $___internal_84dbf6e8dad8a377dad43cb5af3833200eb850d62929dba2fd40650d70f692e5_ = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
                // line 15
                echo sprintf($___internal_84dbf6e8dad8a377dad43cb5af3833200eb850d62929dba2fd40650d70f692e5_, (("<a href=\"server_replication.php\" data-post=\"" . PhpMyAdmin\Url::getCommon(twig_array_merge(($context["url_params"] ?? null), ["mr_configure" => true]), "")) . "\">"), "</a>");
                // line 20
                echo "      </fieldset>
    ";
            }
            // line 22
            echo "
    ";
            // line 23
            if ( !(null === ($context["master_configure"] ?? null))) {
                // line 24
                echo "      ";
                echo ($context["master_configuration_html"] ?? null);
                echo "
    ";
            } else {
                // line 26
                echo "      ";
                if ((null === ($context["clear_screen"] ?? null))) {
                    // line 27
                    echo "        ";
                    echo ($context["slave_configuration_html"] ?? null);
                    echo "
      ";
                }
                // line 29
                echo "      ";
                if ( !(null === ($context["slave_configure"] ?? null))) {
                    // line 30
                    echo "        ";
                    echo ($context["change_master_html"] ?? null);
                    echo "
      ";
                }
                // line 32
                echo "    ";
            }
            // line 33
            echo "  </div>
";
        } else {
            // line 35
            echo "  ";
            echo call_user_func_array($this->env->getFilter('error')->getCallable(), [_gettext("No privileges")]);
            echo "
";
        }
    }

    public function getTemplateName()
    {
        return "server/replication/index.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  126 => 35,  122 => 33,  119 => 32,  113 => 30,  110 => 29,  104 => 27,  101 => 26,  95 => 24,  93 => 23,  90 => 22,  86 => 20,  84 => 15,  81 => 19,  78 => 16,  76 => 15,  72 => 14,  69 => 13,  67 => 12,  62 => 11,  60 => 10,  55 => 8,  52 => 7,  50 => 6,  46 => 4,  44 => 3,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/replication/index.twig", "/var/www/html/frontend/dist/phpMyAdmin/templates/server/replication/index.twig");
    }
}
