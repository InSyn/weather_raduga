<template>
  <div class="wrapper">
    <div
      v-bind:class="['station-wrapper', station.station]"
      v-for="(station, index) in weatherData"
      :key="index"
      v-show="station.station === loc"
    >
      <div class="station-header">
        <div class="time_info_wrapper">
          <div class="title">
            {{ station.title }}
          </div>
          <div
            class="update-time"
            style="display: flex; flex-wrap: nowrap"
            v-if="loc === 'stadium'"
          >
            <div>время обновления: {{ `${station.data.time}` }}</div>
            <div style="flex-grow: 1"></div>
            <div style="font-weight: bold;">{{ `${station.data.date}` }}</div>
          </div>
        </div>
        <div class="real_time" v-if="loc === 'stadium'">
          {{ realTime.hh + ":" + realTime.mm + ":" + realTime.ss }}
        </div>
      </div>
      <div class="station-body">
        <div class="main-section">
          <div class="temp-section">
            <span class="temp"
              >Температура воздуха: {{ station.data.temp }}°</span
            >
            <div class="temp_c" v-if="station.data.temp_c">
              <span> ощущается как: {{ station.data.temp_c }} C°</span>
            </div>
          </div>
          <div class="add-info_section">
            <div class="add-info_inner-wrapper h-p_section">
              <div class="add-info_row humidity-section">
                <span>Влажность: {{ station.data.r }}%</span>
              </div>
              <div class="add-info_row pressure-section" v-if="station.data.p">
                <span
                  >Давление: {{ station.data.p }}
                  <span class="m_u">мм.рт.ст</span></span
                >
              </div>
            </div>
            <div class="add-info_inner-wrapper w-dp_section">
              <div class="add-info_row wind-section" v-if="station.data.wind_s">
                <span>Скорость и направление ветра: </span
                ><span class="m_u">{{
                  station.data.wind_s + " м/с " + station.data.wind_d
                }}</span>
              </div>
              <div class="add-info_row due-point">
                <span>Точка росы: {{ station.data.temp_d }}°</span>
              </div>
            </div>
          </div>
          <div v-if="station.data.vis || station.data.cond" class="temp_sg">
            <div class="temp-sg_inner-wrapper">
              <div v-if="station.data.vis" class="temp-sg_row temp_s">
                Видимость:{{ `${station.data.vis} м` }}
              </div>
              <div v-if="station.data.cond" class="temp-sg_row temp_s">
                <span class="m_u">{{
                  ` ${station.data.cond && station.data.cond}`
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "station",
  props: {
    location: String
  },
  mounted() {
    this.setRealTime();
  },
  computed: {
    ...mapGetters("weather", {
      weatherData: "weatherData",
      loading_data: "loading_data"
    }),
    ...mapGetters("station", {
      realTime: "realTime"
    }),
    loc() {
      return this.$props.location;
    }
  },
  methods: {
    ...mapActions("station", {
      setRealTime: "setRealTime"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "./src/assets/fonts/sizes";

.wrapper {
  padding: 32px 48px;

  .station-wrapper {
    position: relative;
    padding: 32px 64px;
    background: rgba(52, 56, 52, 0.8);
    z-index: 2;
    /*overflow: hidden;*/

    .station-header {
      display: flex;
      position: relative;
      width: 100%;
      z-index: 2;
      font-size: $font_XXL;
      justify-content: space-between;

      .time_info_wrapper {
        .title {
          font-weight: 700;
        }
        .update-time {
          position: relative;
          margin-left: 2rem;
          padding: 0 16px;
          display: flex;
          align-items: flex-end;
          font-size: $font_M;
          color: #2c3e50;
          background: rgba(255, 255, 255, 0.8);

          &::before {
            display: block;
            content: "";
            position: absolute;
            z-index: 1;
            height: 100%;
            width: 2rem;
            top: 0;
            left: -2rem;
            background: linear-gradient(
              to bottom left,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(52, 56, 52, 0) 51%
            );
            transform-origin: left;
          }
        }
      }
      .real_time {
        font-size: $font_XL;
        font-weight: 700;
        position: relative;
        display: flex;
        align-items: center;
        align-self: start;
        padding: 8px 32px;
        margin-top: -24px;
        margin-right: -24px;
        color: #2c3e50;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .station-body {
    display: flex;
    font-size: $font_ML;

    .main-section {
      font-size: $font_SM;
      flex-grow: 1;
      margin-top: 1rem;

      .temp-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: fit-content;
        margin-left: 2rem;

        .temp {
          font-size: $font_L;
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        }
        .temp_c {
          font-size: $font_ML;
          padding: 0 1rem;
          color: #2c3e50;
          background: rgba(255, 255, 255, 0.8);
        }
      }
      .add-info_section {
        display: flex;
        margin-top: 2rem;
        margin-left: 2rem;
        justify-content: flex-start;

        .h-p_section,
        .w-dp_section {
          display: flex;
          align-items: flex-start;
          flex-direction: column;

          .pressure-section {
            font-size: $font_ML;
            margin-top: 4px;
            margin-left: 1rem;
          }
          .due-point {
            font-size: $font_ML;
            margin-top: 4px;
            margin-left: 1rem;
          }
          .humidity-section {
            font-size: $font_ML;
          }
          .wind-section {
            font-size: $font_ML;
          }
        }
        .w-dp_section {
          margin-left: 2rem;

          .wind-section {
            display: flex;

            span {
              display: block;
            }
            .m_u {
              margin-left: 0.4rem;
            }
          }
        }
      }
    }
    .temp_sg {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
      margin-bottom: -24px;
      font-size: $font_SM;
      color: #2c3e50;

      .temp-sg_inner-wrapper {
        display: flex;
        background: rgba(255, 255, 255, 0.8);
        /*padding: 0 8px;*/

        .temp_s,
        .temp_g {
          padding: 4px 8px;
          font-weight: 700;
          font-size: $font_M;
          text-align: start;
        }
        .m_u {
        }
      }
    }
    .m_u {
    }
  }
  .top,
  .bottom {
    .title {
      font-size: $font_ML;
    }
    .station-body {
      .temp-section {
        position: relative;
        background: rgba(255, 255, 255, 0.8);
        color: #2c3e50;
        padding: 2px 6px;
        margin-left: 1rem;

        .temp {
          font-size: $font_M;
          font-weight: 700;
        }
        &::before {
          display: block;
          content: "";
          position: absolute;
          z-index: 1;
          height: 100%;
          width: 1rem;
          top: 0;
          left: -1rem;
          background: linear-gradient(
            to bottom left,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(52, 56, 52, 0) 52%
          );
          transform-origin: left;
        }
      }
      .main-section {
        margin-top: 0.2rem;

        .temp-section {
          .temp {
            border-bottom: none;
          }
        }
        .add-info_section {
          margin-left: 1rem;
          justify-content: flex-end;

          .w-dp_section {
            margin-left: 32px;

            .due-point {
              span {
                font-size: $font_M;
              }
            }
          }
          .h-p_section {
            .humidity-section {
              margin-top: 4px;
              margin-left: 1rem;

              span {
                font-size: $font_M;
              }
            }
          }
        }
      }
    }
    * {
      font-size: $font_SM;
    }
    .temp_sg {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
      margin-bottom: -24px;
      font-size: $font_SM;
      color: #2c3e50;

      .temp-sg_inner-wrapper {
        display: flex;
        background: rgba(255, 255, 255, 0.8);
        /*padding: 0 8px;*/

        .temp_s,
        .temp_g {
          padding: 4px 8px;
          font-weight: 700;
          font-size: $font_SM;
          text-align: start;
        }
        .m_u {
        }
      }
    }
    .m_u {
    }
  }
}

@media screen and (min-width: 1940px) {
  .wrapper {
    padding: 32px 16px;

    .station-wrapper {
      .station-header {
        .time_info_wrapper {
          .title {
            font-size: $font_stadium_L;
          }
          .update-time {
            font-size: $font_stadium_ML;
          }
        }
        .real_time {
          font-size: $font_stadium_L;
        }
      }
      .station-body {
        .main-section {
          .temp-section {
            margin-top: 2rem;
            font-weight: 700;

            .temp {
              font-size: $font_stadium_ML;
              border-bottom: 5px solid rgba(#fff, 0.8);
            }
            .temp_c {
              font-size: $font_stadium_ML;
              font-weight: normal;
            }
          }
          .add-info_section {
            margin-top: 4rem;

            .add-info_inner-wrapper {
              .add-info_row {
                font-size: $font_stadium_ML;
              }
              .pressure-section {
                margin-top: 1rem;
              }
              .due-point {
                margin-top: 1rem;
              }
            }
          }
          .temp_sg {
            margin-top: 4rem;

            .temp-sg_inner-wrapper {
              .temp-sg_row {
                font-size: $font_stadium_ML;
              }
            }
          }
        }
      }
    }
    .top {
      margin-right: 32px;
    }
    .bottom {
      margin-left: 32px;
    }
    .top,
    .bottom {
      margin-top: 2rem;

      .station-header {
        .time_info_wrapper {
          .title {
            font-size: $font_stadium_ML;
          }
        }
      }
      .station-body {
        .main-section {
          .temp-section {
            margin-top: 0.6rem;

            .temp {
              border-bottom: 0;
              font-size: $font_stadium_M;
            }
            .temp_c {
            }
          }
          .add-info_section {
            display: flex;
            justify-content: flex-start;
            margin: 2rem 0 0 2rem;

            .add-info_inner-wrapper {
              margin: 1rem 0 0 0;

              .add-info_row {
                margin: 0;

                span {
                  font-size: $font_stadium_M;
                }
              }
              .pressure-section {
              }
              .due-point {
                margin-left: 2rem;
              }
            }
          }
          .temp_sg {
            .temp-sg_inner-wrapper {
              .temp-sg_row {
                font-size: $font_stadium_M;

                .m_u {
                  font-size: $font_stadium_M;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .wrapper {
    padding: 32px 32px;

    .station-wrapper {
      .station-header {
        font-size: $font_ML;

        .time_info_wrapper {
          .update-time {
            font-size: $font_SM;
          }
        }
        .real_time {
          font-size: $font_L;
        }
      }
    }
    .station-body {
      font-size: $font_SM;

      .main-section {
        margin-top: 1rem;
        font-size: $font_XS;

        .temp-section {
          .temp {
            font-size: $font_M;
          }
          .temp_c {
            font-size: $font_SM;
          }
        }
        .add-info_section {
          margin-top: 1rem;

          .add-info_inner-wrapper {
            .add-info_row {
              span {
                display: block;
                margin: 0;
                font-size: $font_SM;
              }
            }
          }
        }
      }
      .temp_sg {
        .temp-sg_inner-wrapper {
          .temp-sg_row {
            font-size: $font_SM;
          }
          .m_u {
            font-size: $font_SM;
          }
        }
      }
      .m_u {
      }
    }
    .top,
    .bottom {
      .title {
        font-size: $font_S;
      }
      .station-body {
        .temp-section {
          .temp {
            font-size: $font_S;
          }
        }
      }
      * {
        font-size: $font_XS;
      }
      .m_u {
      }
    }
  }
}

@media screen and (max-width: 1025px) {
  .wrapper {
    padding: 24px 16px;

    .station-wrapper {
      .station-header {
        .time_info_wrapper {
          .title {
            font-size: $font_ML;
          }
          .update-time {
            font-size: $font_SM;
          }
        }
        .real_time {
          font-size: $font_ML;
        }
      }
    }
    .station-body {
      .main-section {
        .temp-section {
          .temp {
            font-size: $font_ML;
          }
          .temp_c {
            font-size: $font_SM;
          }
        }
        .add-info_section {
          margin: 0;
          flex-direction: column;
          align-items: flex-start;
          padding: 16px 0;

          .h-p_section,
          .w-dp_section {
            margin-left: 2rem;

            span {
              margin-top: 4px;
              display: block;
              font-size: $font_M;
            }
            .pressure-section {
              margin: 0 0 0 1rem;

              span {
                display: flex;
                align-items: center;
                .m_u {
                  margin-left: 0.4rem;
                }
              }
            }
            .due-point {
              margin: 4px 0 0 1rem;
            }
          }
          .w-dp_section {
            margin-left: 4rem;
          }
        }
      }
      .temp_sg {
        .temp-sg_inner-wrapper {
          .temp-sg_row {
            font-size: $font_SM;
          }
          .m_u {
          }
        }
      }
      .m_u {
      }
    }
    .top,
    .bottom {
      .station-header {
        .time_info_wrapper {
          .title {
            font-size: $font_M;
          }
        }
      }
      .station-body {
        .temp-section {
          .temp {
            font-size: $font_S;
          }
        }
        .main-section {
          .add-info_section {
            .h-p_section,
            .w-dp_section {
              margin-left: 0;

              .add-info_row {
                span {
                  font-size: $font_SM;
                }
              }
              .pressure-section {
                margin: 0;
              }
              .due-point {
                margin: 4px 0 0 1rem;
              }
              .humidity-section {
                margin: 0 0 0 0;
              }
            }
            .w-dp_section {
              margin: 0;
            }
          }
          .temp_sg {
            .temp-sg_inner-wrapper {
              .temp-sg_row {
                font-size: $font_S;
              }
              .m_u {
                font-size: $font_S;
              }
            }
          }
        }
      }
      * {
        font-size: $font_XS;
      }
      .m_u {
      }
    }
  }
}

@media screen and (max-width: 940px) {
  .wrapper {
    .station-wrapper {
      .station-header {
        .time_info_wrapper {
          .title {
            font-size: $font_M;
          }
          .update-time {
            font-size: $font_S;
          }
        }
        .real_time {
          font-size: $font_SM;
        }
      }
    }
    .station-body {
      .main-section {
        .temp-section {
          .temp {
            font-size: $font_SM;
          }

          .temp_c {
            font-size: $font_S;
          }
        }

        .add-info_section {
          .add-info_inner-wrapper {
            .add-info_row {
              span {
                font-size: $font_S;
              }
            }

            .pressure-section {
              margin-left: 0.6rem;
            }
            .wind-section {
              margin-left: 1.2rem;
            }
            .due-point {
              margin-left: 1.8rem;
            }
          }
          .w-dp_section {
            margin-left: 2rem;
          }
        }
      }
      .temp_sg {
        .temp-sg_inner-wrapper {
          .temp-sg_row {
            font-size: $font_S;
          }
          .m_u {
          }
        }
      }
      .m_u {
      }
    }
    .top,
    .bottom {
      .station-header {
        .time_info_wrapper {
          .title {
            font-size: $font_SM;
          }
        }
      }
      .station-body {
        .main-section {
          .temp-section {
            .temp {
              font-size: $font_S;
            }
          }
          .add-info_section {
            .add-info_inner-wrapper {
              .add-info_row {
                span {
                  font-size: $font_S;
                }
              }
            }
          }
        }
      }
      * {
        font-size: $font_XXS;
      }
      .m_u {
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .wrapper {
    padding: 16px 0;

    .station-wrapper {
      padding: 16px 16px;

      .station-header {
        .time_info_wrapper {
          .title {
            text-align: start;
          }
          .update-time {
            &::before {
            }
          }
        }
        .real_time {
          margin: 0;
        }
      }
      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
    }
    .station-body {
      .main-section {
        .temp-section {
          .temp {
          }
          .temp_c {
          }
        }
        .add-info_section {
          .h-p_section,
          .w-dp_section {
            margin-left: 2rem;
            span {
            }
            .pressure-section {
              margin-left: 0.5rem;

              span {
                .m_u {
                }
              }
            }
            .wind-section {
              margin-left: 1rem;
            }
            .due-point {
              margin-left: 1.5rem;
            }
          }
          .w-dp_section {
            .wind-section {
              span {
                text-align: start;

                .m_u {
                  margin-top: 0;
                }
              }
            }
          }
        }
      }
      .temp_sg {
        margin-top: 0;
        margin-bottom: -16px;
        justify-content: center;

        .temp-sg_inner-wrapper {
          .temp_s,
          .temp_g {
            text-align: start;
          }
          .m_u {
          }
        }
      }
      .m_u {
      }
    }
    .top,
    .bottom {
      .title {
      }
      .station-body {
        .temp-section {
          .temp {
          }
          &::before {
          }
        }
        .main-section {
          .temp-section {
            .temp {
            }
          }
          .add-info_section {
            .h-p_section,
            .w-dp_section {
              .pressure-section {
              }
              .due-point {
              }
              .humidity-section {
              }
            }
            .w-dp_section {
            }
          }
        }
      }
      * {
      }
      .m_u {
      }
    }
  }
}
</style>
