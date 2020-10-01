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

/* view_create.twig */
class __TwigTemplate_a8b1d4b50569b0493436b72b69491c7ea98da33575f663bcd114ea751f09184d extends \Twig\Template
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
        echo "<!-- CREATE VIEW options -->
<div id=\"div_view_options\">
    <form method=\"post\" action=\"view_create.php\">
    ";
        // line 4
        echo PhpMyAdmin\Url::getHiddenInputs(($context["url_params"] ?? null));
        echo "
    <fieldset>
        <legend>
            ";
        // line 7
        if (($context["ajax_dialog"] ?? null)) {
            // line 8
            echo "                ";
            echo _gettext("Details");
            // line 9
            echo "            ";
        } else {
            // line 10
            echo "                ";
            if (((($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 = ($context["view"] ?? null)) && is_array($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4) || $__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 instanceof ArrayAccess ? ($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4["operation"] ?? null) : null) == "create")) {
                // line 11
                echo "                    ";
                echo _gettext("Create view");
                // line 12
                echo "                ";
            } else {
                // line 13
                echo "                    ";
                echo _gettext("Edit view");
                // line 14
                echo "                ";
            }
            // line 15
            echo "            ";
        }
        // line 16
        echo "        </legend>
        <table class=\"rte_table\">
            ";
        // line 18
        if (((($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 = ($context["view"] ?? null)) && is_array($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144) || $__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144 instanceof ArrayAccess ? ($__internal_62824350bc4502ee19dbc2e99fc6bdd3bd90e7d8dd6e72f42c35efd048542144["operation"] ?? null) : null) == "create")) {
            // line 19
            echo "                <tr>
                    <td class=\"nowrap\"><label for=\"or_replace\">OR REPLACE</label></td>
                    <td>
                        <input type=\"checkbox\" name=\"view[or_replace]\" id=\"or_replace\"
                            ";
            // line 23
            if ((($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b = ($context["view"] ?? null)) && is_array($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b) || $__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b instanceof ArrayAccess ? ($__internal_1cfccaec8dd2e8578ccb026fbe7f2e7e29ac2ed5deb976639c5fc99a6ea8583b["or_replace"] ?? null) : null)) {
                echo " checked=\"checked\" ";
            }
            // line 24
            echo "                            value=\"1\">
                    </td>
                </tr>
            ";
        }
        // line 28
        echo "
            <tr>
                <td class=\"nowrap\"><label for=\"algorithm\">ALGORITHM</label></td>
                <td>
                    <select name=\"view[algorithm]\" id=\"algorithm\">
                        ";
        // line 33
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["view_algorithm_options"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["option"]) {
            // line 34
            echo "                            <option value=\"";
            echo twig_escape_filter($this->env, $context["option"], "html", null, true);
            echo "\"
                                ";
            // line 35
            if (((($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002 = ($context["view"] ?? null)) && is_array($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002) || $__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002 instanceof ArrayAccess ? ($__internal_68aa442c1d43d3410ea8f958ba9090f3eaa9a76f8de8fc9be4d6c7389ba28002["algorithm"] ?? null) : null) == $context["option"])) {
                // line 36
                echo "                                    selected=\"selected\"
                                ";
            }
            // line 38
            echo "                            >";
            echo twig_escape_filter($this->env, $context["option"], "html", null, true);
            echo "</option>
                        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['option'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 40
        echo "                    </select>
                </td>
            </tr>

            <tr>
                <td class=\"nowrap\">";
        // line 45
        echo _gettext("Definer");
        echo "</td>
                <td><input type=\"text\" maxlength=\"100\" size=\"50\" name=\"view[definer]\" value=\"";
        // line 46
        echo twig_escape_filter($this->env, (($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4 = ($context["view"] ?? null)) && is_array($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4) || $__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4 instanceof ArrayAccess ? ($__internal_d7fc55f1a54b629533d60b43063289db62e68921ee7a5f8de562bd9d4a2b7ad4["definer"] ?? null) : null), "html", null, true);
        echo "\"></td>
            </tr>

            <tr>
                <td class=\"nowrap\">SQL SECURITY</td>
                <td>
                    <select name=\"view[sql_security]\">
                        <option value=\"\"></option>
                        ";
        // line 54
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["view_security_options"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["option"]) {
            // line 55
            echo "                            <option value=\"";
            echo twig_escape_filter($this->env, $context["option"], "html", null, true);
            echo "\"
                                ";
            // line 56
            if (($context["option"] == (($__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666 = ($context["view"] ?? null)) && is_array($__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666) || $__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666 instanceof ArrayAccess ? ($__internal_01476f8db28655ee4ee02ea2d17dd5a92599be76304f08cd8bc0e05aced30666["sql_security"] ?? null) : null))) {
                echo " selected=\"selected\" ";
            }
            // line 57
            echo "                            >";
            echo twig_escape_filter($this->env, $context["option"], "html", null, true);
            echo "</option>
                        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['option'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 59
        echo "                    </select>
                </td>
            </tr>

            ";
        // line 63
        if (((($__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e = ($context["view"] ?? null)) && is_array($__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e) || $__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e instanceof ArrayAccess ? ($__internal_01c35b74bd85735098add188b3f8372ba465b232ab8298cb582c60f493d3c22e["operation"] ?? null) : null) == "create")) {
            // line 64
            echo "                <tr>
                    <td class=\"nowrap\">";
            // line 65
            echo _gettext("VIEW name");
            echo "</td>
                    <td>
                        <input type=\"text\" size=\"20\" name=\"view[name]\" onfocus=\"this.select()\" maxlength=\"64\" value=\"";
            // line 67
            echo twig_escape_filter($this->env, (($__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52 = ($context["view"] ?? null)) && is_array($__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52) || $__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52 instanceof ArrayAccess ? ($__internal_63ad1f9a2bf4db4af64b010785e9665558fdcac0e8db8b5b413ed986c62dbb52["name"] ?? null) : null), "html", null, true);
            echo "\">
                    </td>
                </tr>
            ";
        } else {
            // line 71
            echo "                <tr>
                    <td>
                        <input type=\"hidden\" name=\"view[name]\" value=\"";
            // line 73
            echo twig_escape_filter($this->env, (($__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136 = ($context["view"] ?? null)) && is_array($__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136) || $__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136 instanceof ArrayAccess ? ($__internal_f10a4cc339617934220127f034125576ed229e948660ebac906a15846d52f136["name"] ?? null) : null), "html", null, true);
            echo "\">
                    </td>
                </tr>
            ";
        }
        // line 77
        echo "
            <tr>
                <td class=\"nowrap\">";
        // line 79
        echo _gettext("Column names");
        echo "</td>
                <td>
                    <input type=\"text\" maxlength=\"100\" size=\"50\" name=\"view[column_names]\" onfocus=\"this.select()\"  value=\"";
        // line 81
        echo twig_escape_filter($this->env, (($__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386 = ($context["view"] ?? null)) && is_array($__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386) || $__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386 instanceof ArrayAccess ? ($__internal_887a873a4dc3cf8bd4f99c487b4c7727999c350cc3a772414714e49a195e4386["column_names"] ?? null) : null), "html", null, true);
        echo "\">
                </td>
            </tr>

            <tr>
                <td class=\"nowrap\">AS</td>
                <td>
                    <textarea name=\"view[as]\" rows=\"15\" cols=\"40\" dir=\"";
        // line 88
        echo twig_escape_filter($this->env, ($context["text_dir"] ?? null), "html", null, true);
        echo "\" onclick=\"Functions.selectContent(this, sqlBoxLocked, true)\">";
        echo twig_escape_filter($this->env, (($__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9 = ($context["view"] ?? null)) && is_array($__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9) || $__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9 instanceof ArrayAccess ? ($__internal_d527c24a729d38501d770b40a0d25e1ce8a7f0bff897cc4f8f449ba71fcff3d9["as"] ?? null) : null), "html", null, true);
        echo "</textarea><br>
                    <input type=\"button\" value=\"Format\" id=\"format\" class=\"btn btn-secondary button sqlbutton\">
                    <span id=\"querymessage\"></span>
                </td>
            </tr>

            <tr>
                <td class=\"nowrap\">WITH CHECK OPTION</td>
                <td>
                    <select name=\"view[with]\">
                        <option value=\"\"></option>
                        ";
        // line 99
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["view_with_options"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["option"]) {
            // line 100
            echo "                            <option value=\"";
            echo twig_escape_filter($this->env, $context["option"], "html", null, true);
            echo "\"
                                ";
            // line 101
            if (($context["option"] == (($__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae = ($context["view"] ?? null)) && is_array($__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae) || $__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae instanceof ArrayAccess ? ($__internal_f6dde3a1020453fdf35e718e94f93ce8eb8803b28cc77a665308e14bbe8572ae["with"] ?? null) : null))) {
                echo " selected=\"selected\" ";
            }
            // line 102
            echo "                            >";
            echo twig_escape_filter($this->env, $context["option"], "html", null, true);
            echo "</option>
                        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['option'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 104
        echo "                    </select>
                </td>
            </tr>

        </table>
    </fieldset>

    <input type=\"hidden\" name=\"ajax_request\" value=\"1\" />
    <input type=\"hidden\" name=\"";
        // line 112
        echo ((((($__internal_25c0fab8152b8dd6b90603159c0f2e8a936a09ab76edb5e4d7bc95d9a8d2dc8f = ($context["view"] ?? null)) && is_array($__internal_25c0fab8152b8dd6b90603159c0f2e8a936a09ab76edb5e4d7bc95d9a8d2dc8f) || $__internal_25c0fab8152b8dd6b90603159c0f2e8a936a09ab76edb5e4d7bc95d9a8d2dc8f instanceof ArrayAccess ? ($__internal_25c0fab8152b8dd6b90603159c0f2e8a936a09ab76edb5e4d7bc95d9a8d2dc8f["operation"] ?? null) : null) == "create")) ? ("createview") : ("alterview"));
        echo "\" value=\"1\" />

    ";
        // line 114
        if ((($context["ajax_dialog"] ?? null) == false)) {
            // line 115
            echo "        <input type=\"hidden\" name=\"ajax_dialog\" value=\"1\" />
        <input type=\"submit\" name=\"\" value=\"";
            // line 116
            echo _gettext("Go");
            echo "\" />
    ";
        }
        // line 118
        echo "
    </form>
</div>
";
    }

    public function getTemplateName()
    {
        return "view_create.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  287 => 118,  282 => 116,  279 => 115,  277 => 114,  272 => 112,  262 => 104,  253 => 102,  249 => 101,  244 => 100,  240 => 99,  224 => 88,  214 => 81,  209 => 79,  205 => 77,  198 => 73,  194 => 71,  187 => 67,  182 => 65,  179 => 64,  177 => 63,  171 => 59,  162 => 57,  158 => 56,  153 => 55,  149 => 54,  138 => 46,  134 => 45,  127 => 40,  118 => 38,  114 => 36,  112 => 35,  107 => 34,  103 => 33,  96 => 28,  90 => 24,  86 => 23,  80 => 19,  78 => 18,  74 => 16,  71 => 15,  68 => 14,  65 => 13,  62 => 12,  59 => 11,  56 => 10,  53 => 9,  50 => 8,  48 => 7,  42 => 4,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "view_create.twig", "/var/www/html/phpMyAdmin/templates/view_create.twig");
    }
}
