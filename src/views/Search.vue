<template>
  <div class="container">
    <div class="text-center">
      <div>
        <GmapMap
          :center="center"
          :zoom="12"
          :options="{streetViewControl: false}"
          ref="map"
          style="width: 100%; height:400px; margin:32px auto;"
          @center_changed="centerChanged"
        >
          <GmapInfoWindow
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen=false">
            <router-link :to="{name:'store', params:{id: infoContents.id}}">
              <table>
                <tr>
                  <td><img :src="infoContents.downloadURL" width="100" height="100" alt="ロゴ"></td>
                    <td style="text-align:left;">
                      <p class="kitchencarname">{{ infoContents.name }}</p>
                      <p>ジャンル：{{ infoContents.genre }}</p>
                      <p>予算：{{ infoContents.budget }}</p>
                    </td>
                </tr>
              </table>
            </router-link>
          </GmapInfoWindow>
          <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
              :position="m.position"
            :clickable="true" :draggable="false"
            @click="toggleInfoWindow(m, index)"
          />
          <GmapMarker
            v-show="marker_center"
            :position="marker_center" :clickable="true"
            :draggable="false"
          />
        </GmapMap>
        <button class="btn" @click="mapTest">検索</button>
        <button class="btn" @click="currentPosition">現在地へ移動</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  data () {
    return {
      center: {
        lat: 0,
        lng: 0
      },
      markers: [],
      marker_center: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoContents: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  created () {
    // 現在地取得
    this.$getLocation()
      .then(cordinates => {
        this.center = cordinates
      })
  },
  methods: {
    centerChanged (center) {
      this.marker_center = { lat: center.lat(), lng: center.lng() }
    },
    // 現在地周辺のお店を検索
    mapTest () {
      const latlngBounds = this.$refs.map.$mapObject.getBounds()
      const center = this.$refs.map.$mapObject.getCenter()
      console.log(latlngBounds)
      console.log(center)
      // 表示mapの南と西(左下)を取得
      const swLatlng = latlngBounds.getSouthWest()
      const swlat = swLatlng.lat()
      const swlng = swLatlng.lng()
      console.log(swlat, swlng)
      // 表示mapの東と北(右上)を取得
      const neLatlng = latlngBounds.getNorthEast()
      const nelat = neLatlng.lat()
      const nelng = neLatlng.lng()
      console.log(nelat, nelng)
      // 表示mapのlatitude範囲内にあるデータを取得
      const firestoreWhere = firebase.firestore().collection('kitchencars')
        // map bottom
        .where('myCordinate.lat', '>', swlat)
        // map top
        .where('myCordinate.lat', '<', nelat)
      firestoreWhere.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // 表示mapのlongitude範囲内にあるデータを取得
          firebase.firestore().collection('kitchencars')
            // map left
            .where('myCordinate.lng', '>', swlng)
            // map right
            .where('myCordinate.lng', '<', nelng)
            .onSnapshot((querySnapshot) => {
              console.log(querySnapshot.size)
              querySnapshot.forEach((doc) => {
                console.log(doc.id, '', doc.data())
                // marker[]にposition,name,genreのデータをいれる
                const data = {
                  id: doc.id,
                  position: doc.data().myCordinate,
                  name: doc.data().name,
                  genre: doc.data().genre,
                  budget: doc.data().budget,
                  downloadURL: doc.data().url
                }
                this.markers.push(data)
              })
            })
        })
      })
    },
    // markerをクリックすると、infowindowが出現
    toggleInfoWindow (marker, index) {
      this.infoWindowPos = marker.position
      this.infoContents = marker
      this.infoWinOpen = true
    },
    // 現在地へ移動ボタンを押すと作動
    currentPosition () {
      // 現在地を取得
      navigator.geolocation.getCurrentPosition(this.getCurrentPositionSuccess)
    },
    // 現在地取得できた場合
    getCurrentPositionSuccess (position) {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      // panToで現在地の座標に移動
      this.$refs.map.panTo({ lat: lat, lng: lng })
    }
  }
}
</script>

<style scoped>
#map {
  display:flex;
  align-items:center;
  justify-content:space-between;
}
h1 {
  font-size: medium;
  font-weight: bold;
  padding: 16px 0px;
}
button {
  background-color: #ff9922;
  color: #fff8cf;
  margin: 0px 20px;
}
GmapInfoWindow:hover{
  background-color: #dddddd;
}
.kitchencarname {
  font-size: 20px;
}
</style>
