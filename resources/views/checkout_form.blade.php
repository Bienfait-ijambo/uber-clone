<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stripe Payment</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="flex items-center justify-center min-h-screen bg-gray-100">

    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold text-center mb-4">Secure Payment</h2>
        <span class="flex justify-center">
            <img src="{{url('/img/stripe.png')}}" alt="stripe_logo" width="150">
        </span>

        <form id="payment-form" class="space-y-4">
            <!-- Card Element -->
            <div id="card-element" class="p-3 border border-gray-300 rounded-md bg-gray-50"></div>
            <!-- Submit Button -->
             <input type="hidden" id="publicKey" value="{{$publicKey}}">
             <input type="hidden" id="tripCode" value="{{$customerTrip->trip_code}}">
             <input type="hidden" id="totalPrice" value="{{$customerTrip->total_price}}">

            <button
                type="submit"
                id="pay-button"
                class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400">
                Pay ${{$customerTrip->total_price}}
            </button>
        </form>

        <!-- Error Message -->
        <p id="card-errors" class="text-red-500 text-sm mt-2 text-center hidden"></p>

        <!-- Loader -->
        <div id="loader" class="hidden text-center mt-3">
            <svg class="animate-spin h-6 w-6 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
        </div>
    </div>

    <script src="https://js.stripe.com/v3/"></script>
    <script>
       
      document.addEventListener('DOMContentLoaded',function(){


        const stripekey=document.querySelector('#publicKey')
        const stripe = Stripe(stripekey.value);
        const elements = stripe.elements();
        const card = elements.create("card", {
            style: {
                base: {
                    fontSize: "16px",
                    color: "#32325d",
                    fontFamily: "Arial, sans-serif",
                    '::placeholder': {
                        color: "#aab7c4"
                    },
                },
                invalid: {
                    color: "#fa755a"
                }
            }
        });

        card.mount("#card-element");

        document.getElementById("payment-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const payButton = document.getElementById("pay-button");
            const loader = document.getElementById("loader");
            const cardErrors = document.getElementById("card-errors");


            payButton.disabled = true;
            loader.classList.remove("hidden");
            cardErrors.classList.add("hidden");

            const {
                paymentMethod,
                error
            } = await stripe.createPaymentMethod({
                type: "card",
                card: card,
            });

            if (error) {
                cardErrors.textContent = error.message;
                cardErrors.classList.remove("hidden");
                payButton.disabled = false;
                loader.classList.add("hidden");
            } else {

                const userData=getUserData();
                const tripCode=document.querySelector('#tripCode')
                const totalPrice=document.querySelector('#totalPrice')

                fetch("/pay", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization":'Bearer '+userData?.token,
                            "X-CSRF-TOKEN": "{{ csrf_token() }}"
                        },
                        body: JSON.stringify({
                            payment_method_id: paymentMethod.id,
                            trip_code:tripCode.value,
                            amount:totalPrice.value
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            alert("Payment successful!");
                            window.location.href='/app/trips?redirect=true'
                        } else {
                            cardErrors.textContent = "Payment failed: " + data.error;
                            cardErrors.classList.remove("hidden");
                        }
                        payButton.disabled = false;
                        loader.classList.add("hidden");
                    });
            }
        });



        function getUserData() {

            try {
                const userData = localStorage.getItem('userData');

                if (typeof userData !== 'object') {
                    const parseUserData = JSON.parse(userData)
                    return parseUserData
                }

            } catch (error) {

                showError(error?.message)

            }

        }
      })
    </script>

</body>

</html>