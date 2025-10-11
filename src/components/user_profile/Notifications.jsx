import React, {useState} from 'react'

const Notifications = () => {

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    smsAlerts: true,
    emailAlerts: true
  });

  return (
    <div>
      <div className='mb-6 space-y-2'>
        <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
        <p className="text-md text-gray-600">Choose how you want to be notified</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Order Updates</h3>
            <p className="text-sm text-gray-600">Get notified about your order status</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.orderUpdates}
              onChange={(e) => setNotifications({...notifications, orderUpdates: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Promotions & Offers</h3>
            <p className="text-sm text-gray-600">Receive exclusive deals and discounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.promotions}
              onChange={(e) => setNotifications({...notifications, promotions: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Newsletter</h3>
            <p className="text-sm text-gray-600">Weekly newsletter with product updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.newsletter}
              onChange={(e) => setNotifications({...notifications, newsletter: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">SMS Alerts</h3>
            <p className="text-sm text-gray-600">Get SMS notifications on your phone</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.smsAlerts}
              onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email Alerts</h3>
            <p className="text-sm text-gray-600">Receive email notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Notifications