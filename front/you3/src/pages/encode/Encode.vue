<template>
  <div class="page-header clear-filter" filter-color="white">
    <div
        class="page-header-image"
        style="background-image: url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt=""/>
            </div>

            <fg-input
                name="videoUrl"
                v-model="url"
                class="no-border input-lg"
                addon-left-icon="fab fa-youtube"
                placeholder="Enter url here..."
            >
            </fg-input>


            <div class="card-footer text-center">
              <button
                  v-if="!isLoading"
                  type="button"
                  v-on:click="convertButtonClicked()"
                  class="btn btn-primary btn-round btn-lg btn-block">Convert to MP3
              </button>
              <div v-if="isLoading" class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div class="pull-right">
              <h6>
                <a href="#pablo" class="link footer-link">Need Help?</a>
              </h6>
            </div>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import {Card, Button, FormGroupInput} from '@/components';
import MainFooter from '@/layout/MainFooter';
import saveAs from 'file-saver';

export default {
  name: 'encode-page',
  bodyClass: 'login-page',
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data: function () {
    return {
      ws: undefined,
      url: null,
      fileName: undefined,
      isLoading: false
    }
  },
  methods: {
    convertButtonClicked: function () {
      this.isLoading = true;

        this.ws = new WebSocket(process.env.VUE_APP_API_URL);
        if (this.ws.readyState === WebSocket.CLOSED){
          console.error('cannot contact server');
          this.isLoading = false;
        }
        this.ws.binaryType = "arraybuffer";

      this.ws.onopen = () => {
        console.log('connected');
        this.ws.send(JSON.stringify({type: 'convert', payload: this.url}));
      };

      this.ws.onError = (err) => {
        console.error('ws error', err);
        this.isLoading = false;
      }

      this.ws.onmessage = (data) => {
        let deserializedContent;

        try {
          deserializedContent = JSON.parse(data.data);
          this.fileName = deserializedContent.payload.replace('\n', '');
        } catch (e) {
          this.ws.close();
          this.isLoading = false;
        }
        if (!deserializedContent) {
          const blob = new Blob([data.data], {type: "audio/mpeg3"});
          saveAs(blob, this.fileName);

          this.isLoading = false;
          this.ws.close();
        }
      };
    },
  }
};

</script>
<style></style>
