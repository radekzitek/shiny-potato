<template>
  <!-- Footer -->
  <MDBFooter :text="['muted']">
    <!-- Section: Social media -->
    <section
      class="d-flex p-3 justify-content-between border-top border-bottom"
    >
      <!-- Left -->
      <div>
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
          class="text-reset"
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
    <section class="border-bottom p-3">
      <MDBContainer class="text-start mt-2">
        <!-- Grid row -->
        <MDBRow>
          <!-- Grid column -->
          <MDBCol
            md="4"
            class="mx-auto mb-4"
          >
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-2">
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
            class="mx-auto mb-4"
          >
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-2">
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
            class="mx-auto mb-4"
          >
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-2">
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
            class="mx-auto mb-4"
          >
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-2">
              Contact
            </h6>
            <p>
              <i class="fas fa-home me-3" /> U lesoparku 996, 250 91 Zeleneč, CZ
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
      </MDBContainer>
    </section>
    <!-- Section: Links  -->
    <!-- Copyright -->
    <div class="text-center border-bottom p-3">
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
