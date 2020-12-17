<template>
  <div class="weather-wrapper">
    <div class="weather-header"></div>
    <div class="main-station station-wrapper">
      <station location="stadium"></station>
    </div>
    <div class="forest-stations">
      <div class="station-wrapper">
        <station location="top"></station>
      </div>
      <div class="station-wrapper">
        <station location="bottom"></station>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import station from "./station/station";

export default {
  mounted() {
    document.title = 'МСК "Радуга". Погода';
    this.getData();
    setInterval(() => {
      this.getData();
      console.log();
    }, 15000);
  },
  name: "weather",
  components: {
    station
  },
  computed: {
    ...mapGetters("weather", {
      loading_data: "loading_data"
    })
  },
  methods: {
    ...mapActions("weather", {
      getData: "getData"
    })
  }
};
</script>

<style lang="scss" scoped>
.weather-wrapper {
  display: flex;
  flex-direction: column;
  padding: 32px 128px;

  .weather-header {
  }
  .forest-stations {
    display: flex;

    .station-wrapper {
      flex-grow: 1;
    }
  }
}

@media screen and (max-width: 1420px) {
  .forest-stations {
    flex-direction: column;
  }
}

@media screen and (max-width: 1025px) {
  .weather-wrapper {
    padding: 24px 64px;
  }
}
@media screen and (max-width: 940px) {
  .weather-wrapper {
    padding: 18px 32px;
  }
}

@media screen and (max-width: 750px) {
  .weather-wrapper {
    padding: 16px 0;
  }
}
</style>
