import { useState } from "react"
import useAuth from "../hooks/useAuth"
import useSubscription from "../hooks/useSubscription"
import { gotToBillingPortal } from "../lib/stripe"
import Loader from "./Loader"

function Membership() {
const { user } = useAuth()
const subscription = useSubscription(user)
const [billingLoading, setBillingLoading] = useState(false)

const manageSubscription = () => {
    if (subscription) {
        setBillingLoading(true)
        gotToBillingPortal()
    }
}

  return (
    <div className="grid grid-cols-1 px-4 mt-6 border gap-x-4 md:grid-cols-4 md:border-x-0 md:border-t-0 md:border-b-0 md:px-0">
        <div className="py-4 space-y-2 m">
            <h4 className="text-lg text-[gray]">Membership & Billing</h4>
            <button
            disabled={billingLoading || !subscription}
            className="w-3/5 h-10 py-2 text-sm font-medium text-black bg-gray-300 shadow-md whitespace-nowrap hover:bg-gray-200 md:w-4/5"
            onClick={manageSubscription}
            >
            {billingLoading ? (
                <Loader color="dark:fill-[#e50914]" />
            ) : (
                'Cancel Membership'
            )}
            </button>
        </div>

        <div className="col-span-3">
            <div className="flex flex-col justify-between py-4 border-b border-white/10 md:flex-row">
                <div>
                    <p className="font-medium ">{user?.email}</p>
                    <p className="text-[gray]">Password: *****</p>
                </div>
                <div className="md:text-right">
                    <p className="membershipLink">Change email</p>
                    <p className="membershipLink">Change password</p>
                </div>
            </div>

            <div className="flex flex-col justify-between py-4 md:flex-row md:pb-0">
                <div>
                    <p>
                    {subscription?.cancel_at_period_end
                        ? 'Your membership will end on '
                        : 'Your next billing date is '}
                    {subscription?.current_period_end}
                    </p>
                </div>
                <div className="md:text-right">
                    <p className="membershipLink">Manage payment info</p>
                    <p className="membershipLink">Add backup payment method</p>
                    <p className="membershipLink">Billing Details</p>
                    <p className="membershipLink">Change billing day</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Membership