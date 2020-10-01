<html>
        <div class="btn-group">
        <!-- Reference buttons -->
        <input type="file" id="dbutton_input_file" name="file" accept=".txt,.sbv">
        <a class="dropdown-item" href="#" id="dbutton_box-select" data-link-type="shared" data-multiselect="true" data-client-id="ubhbb3lpbh5mccg3xrgmlv0xcgihzdhu">Box</a>
         <!-- Used buttons -->
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Load from Online Drives
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item">Load from local Drive</a>
            <a class="dropdown-item">Google Drive</a>
            <a class="dropdown-item dropbox_button" href="#" onclick="clickDropboxButton()">Dropbox</a>
            <a class="dropdown-item" href="#" onclick="document.getElementById('box-select').click();">Box</a>
          </div>
        </div>
</html>
