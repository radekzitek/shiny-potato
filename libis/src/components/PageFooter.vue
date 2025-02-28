<template>
  <!-- Footer -->
  <MDBFooter :text="['center', 'lg-start', 'muted']">
    <!-- Section: Social media -->
    <section
      class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
    >
      <!-- Left -->
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with me on social networks:</span>
      </div>
      <!-- Left -->
      <!-- Right -->
      <div>
        <a
          href=""
          class="me-4 text-reset"
        >
          <MDBIcon
            icon-style="fab"
            icon="facebook-f"
          />
        </a>
        <a
          href=""
          class="me-4 text-reset"
        >
          <MDBIcon
            icon-style="fab"
            icon="twitter"
          />
        </a>
        <a
          href=""
          class="me-4 text-reset"
        >
          <MDBIcon
            icon-style="fab"
            icon="google"
          />
        </a>
        <a
          href=""
          class="me-4 text-reset"
        >
          <MDBIcon
            icon-style="fab"
            icon="instagram"
          />
        </a>
        <a
          href=""
          class="me-4 text-reset"
        >
          <MDBIcon
            icon-style="fab"
            icon="linkedin"
          />
        </a>
        <a
          href=""
          class="me-4 text-reset"
        >
          <MDBIcon
            icon-style="fab"
            icon="github"
          />
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
    <!-- Section: Links  -->
    <section class="">
      <MDBContainer class="text-center text-md-start mt-4">
        <!-- Grid row -->
        <MDBRow class="mb-0">
          <!-- Grid column -->
          <MDBCol
            md="3"
            lg="4"
            xl="3"
            class="mx-auto mb-4"
          >
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3" />Radek Zítek
            </h6>
            <p>
              Full stack development using Python with Django on the back end
              and JavaScript (or TypeScript) with Vue.js+Vite on the front end.
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol
            md="2"
            lg="2"
            xl="2"
            class="mx-auto mb-4"
          >
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">
              Products
            </h6>
            <p>
              <a
                href="#!"
                class="text-reset"
              >Django</a>
            </p>
            <p>
              <a
                href="#!"
                class="text-reset"
              >Vite</a>
            </p>
            <p>
              <a
                href="#!"
                class="text-reset"
              >Vue.js</a>
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol
            md="2"
            lg="2"
            xl="2"
            class="mx-auto mb-4"
          >
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-0">
              Useful links
            </h6>
            <p>
              <a
                href="#!"
                class="text-reset"
              >Pricing</a>
            </p>

            <p>
              <a
                href="#!"
                class="text-reset"
              >Orders</a>
            </p>
            <p>
              <a
                href="#!"
                class="text-reset"
              >Help</a>
            </p>
          </MDBCol>
          <!-- Grid column -->
          <!-- Grid column -->
          <MDBCol
            md="4"
            lg="3"
            xl="3"
            class="mx-auto mb-4"
          >
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">
              Contact
            </h6>
            <p>
              <i class="fas fa-home me-3" /> U lesoparku 996, 250 91 Zeleneč
            </p>
            <p>
              <i class="fas fa-envelope me-3" />
              radekzitek@gmail.com
            </p>
            <p>
              <MDBIcon
                icon="phone"
                class="me-3"
              /> + 420 777 937 236
            </p>
          </MDBCol>
          <!-- Grid column -->
        </MDBRow>
        <!-- Grid row -->
        <MDBRow>
          <!-- Grid column -->
          <MDBCol
            md="3"
            lg="4"
            xl="3"
            class="mx-auto mb-0"
          >
            <a
              href="https://vitejs.dev/"
              target="_blank"
            >
              <img
                src="/vite.svg"
                class="logo"
                alt="Vite logo"
              >
            </a>
            <a
              href="https://vuejs.org/"
              target="_blank"
            >
              <img
                src="../assets/vue.svg"
                class="logo vue"
                alt="Vue logo"
              >
            </a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    <!-- Section: Links  -->
    <!-- Copyright -->
    <div
      class="text-center p-4"
      style="background-color: rgba(0, 0, 0, 0.05)"
    >
      © 2021 Copyright by
      <a
        class="text-reset fw-bold"
        href="https://mdbootstrap.com/"
      >Radek Zítek</a>
    </div>
    <!-- Copyright -->
  </MDBFooter>
  <!-- Footer -->
</template>

<script setup>
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-vue-ui-kit";
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
