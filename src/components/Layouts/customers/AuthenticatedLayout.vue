<template>
  <div class="bodyTemp h-screen flex flex-col">
    <CustomerNavbar />

    <router-view></router-view>

    <FooterView class="flex-auto" />
  </div>
</template>

<script>
import FooterView from "@/components/Footers/customers/FooterView.vue";
import CustomerNavbar from "@/components/Navbars/customers/AuthCustomer.vue";

export default {
  data() {
    return {
      //
    };
  },
  components: {
    CustomerNavbar,
    FooterView,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

.bodyTemp {
  /* background: url('../../assets/index_bg.png') no-repeat; */
  background-size: cover;
  font-family: "Inter";
}

.fadeInSlide {
  animation: fadeInSlide 0.5s ease;
}
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translate3d(10%, 10%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fade {
  animation: fade 0.5s ease;
}

@keyframes fade {
  to {
    opacity: 0.25;
  }
}

.slideOut {
  animation: slideOut 0.5s ease;
}
@keyframes slideOut {
  from {
    width: 0;
  }
  to {
    width: 14rem;
  }
}

.slideIn {
  animation: slideIn 0.5s ease;
}
@keyframes slideIn {
  from {
    width: 14rem;
  }
  to {
    width: 0;
  }
}

.slideDown {
  animation: slideDown 0.5s ease forwards;
}
@keyframes slideDown {
  from {
    height: 0;
    max-height: 0;
    transition: max-height 1s cubic-bezier(0, 1, 0, 1);
  }
  to {
    max-height: 1000px;
    transition: max-height 1s ease;
  }
}

.slideUp {
  animation: slideUp 0.5s ease;
}
@keyframes slideUp {
  from {
    height: 8rem;
  }
  to {
    height: 0;
    max-height: 1000px;
  }
}
</style>
