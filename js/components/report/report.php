<html>       
        <div class="row">
                <div class="col-sm-9 screenshotCanvasWrapper ">
                    <div class="paintMenu">
                        <div class="menuItem palette undo" id="erasing" title="Undo">
                            <img src="/assets/309080.svg" alt="" class="menuImg">
                        </div>
                        <div id="colorpickerTextColor2" class="input-group input-group-sm colorpicker-component text-option">
                            <label class="input-group-addon" for="colorText2">Color</label>
                            <input type="text" value="#ff0000" class="form-control" class="colorText2" id="colorText2" />
                            <span class="input-group-addon"><i></i></span>
                        </div>
                        <div class="menuSectionWrapper drawWrapper">
                            <form>
                                <select id="sizeOfText" type="range" name="amountRange" value="1" oninput="this.form.amountInput.value=this.value" class="sizeOfText" title="Choose size">
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                    <option value="14">14</option>
                                    <option value="16">16</option>
                                    <option value="18">18</option>
                                </select>
                            </form>
                            <div class="menuItem text" id="text" data-command="type" title="Type text"><img src="/assets/ft14-text.svg" alt="" class="menuImg"></div>
                            <div class="menuItem pencil active" id="pencil" data-command="draw" title="Draw tool"><img src="/assets/Anonymous-Pencil-icon.svg" alt="" class="menuImg"></div>
                        </div>
                        <div class="menuSectionWrapper shapesWrapper">
                            <div class="menuItem shapeItemLine" data-command="line" title="Line tool">
                                <div class="shape shapeline palette" id="shapeline"></div>
                            </div>
                            <div class="menuItem shapeItem1" data-command="rectangle" title="Rectangle tool">
                                <div class="shape shaperectangle palette" id="shaperectangle"></div>
                            </div>
                            <div class="menuItem shapeItem2" data-command="circle" title="Circle tool">
                                <div class="shape shapecircle palette" id="shapecircle"></div>
                            </div>
                            <div class=" shape shapearrow palette menuItem" id="shapearrow" data-command="arrow" title="Arrow tool">
                                <img src="/assets/Sideways_Arrow_Icon.svg.png" alt="" class="menuImg">
                            </div>
                        </div>
                    </div>
                    <div id="innerCanvasWrapper" class="innerCanvasWrapper">
                        <canvas id="screenShotCanvas" class="screenShotCanvas" tabindex='1'></canvas>
                    </div>
                </div>
                <div class="col-sm-3 reportTextWrapper">
                    <a href="" class="closeReport">
                        <img src="/assets/Close-2-icon.png" alt="">
                    </a>
                    <div class="action_text"></div>
                    <form id="reportForm" class="reportForm">
                        <textarea class="report_text" rows="18"></textarea>
                        <h5 class="screenshot_text">Screenshot will be automatically attached to the bug report.</h5>
                        <button type="submit" id="submitReport" class="btn btn_primary">Submit</button>
                    </form>
                </div>
            </div>
</html>