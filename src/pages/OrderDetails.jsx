import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Package, CheckCircle, MapPin, CreditCard, Download, Phone, Mail } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../components/Api';
import { Toaster, toast } from 'react-hot-toast';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const orderId = slug;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelNotes, setCancelNotes] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await api.get(`orders/${orderId}`, { headers: { Token: `Bearer ${token}` } });
        setOrder(res.data?.data);
      } catch (err) {
        toast.error(err.response?.data?.errors || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  const formatPrice = (price) => {
    const n = Number(price || 0);
    return `₹${n.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getStatusBadge = useMemo(() => {
    const status = order?.status || '';
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'out_for_delivery': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'pending':
      case 'confirmed':
      case 'packed': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }, [order]);

  const canCancel = order?.can_be_cancelled ?? (order?.status && ['pending', 'confirmed', 'processing'].includes(order.status));
  const canReturn = order?.can_be_returned ?? (order?.status === 'delivered');

  const handleCancel = async () => {
    if (!order) return;
    try {
      setCancelling(true);
      const token = localStorage.getItem('token');
      const res = await api.patch(`orders/${order.id}/cancel`, { notes: cancelNotes || 'Customer requested cancellation' }, { headers: { Token: `Bearer ${token}` } });
      setOrder(res.data?.data);
      toast.success(res.data?.message || 'Order cancelled');
    } catch (err) {
      toast.error(err.response?.data?.errors || 'Cancel failed');
    } finally {
      setCancelling(false);
    }
  };

  const handleReturn = async () => {
    if (!order) return;
    try {
      const token = localStorage.getItem('token');
      const res = await api.patch(`orders/${order.id}/request_return`, { notes: 'Customer requested return' }, { headers: { Token: `Bearer ${token}` } });
      setOrder(res.data?.data);
      toast.success(res.data?.message || 'Return requested');
    } catch (err) {
      toast.error(err.response?.data?.errors || 'Return failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-700 mx-auto mb-4" />
          <p className="text-gray-600">Loading order…</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate("/user-profile")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                <p className="text-gray-600">Order {order.order_number || order.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => generateInvoice(order)} className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </button>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusBadge}`}>
                {(order.status_display || order.status).replace("_", " ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
              <div className="relative">
                {(order.order_statuses || []).map((s, index) => (
                  <div key={s.id || index} className="flex gap-4 pb-8 last:pb-0 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.status === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}>
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      {index < (order.order_statuses?.length || 1) - 1 && (
                        <div className={`w-0.5 h-full mt-2 ${s.status === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900">{s.status_display || s.status}</h3>
                        <div className="text-sm text-gray-600">{s.created_at_time || formatDate(s.created_at)}</div>
                      </div>
                      <p className="text-sm text-gray-600">{s.notes}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-medium text-gray-900">{formatDate(order.estimated_delivery)}</p>
                  </div>
                  <Link to={`/orders/${order.id}/track`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    Track Order
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {(order.order_items || []).map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.product_name_with_variant || item.product_name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.variant_details}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Quantity: {item.quantity}</span>
                        <span className="text-xl font-bold text-gray-900">{formatPrice(parseFloat(item.total_price))}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Address
              </h2>
              <div className="text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">{order.shipping_address?.name}</p>
                <p className="mb-1">{order.shipping_address?.phone}</p>
                <p>{order.shipping_address?.address_line1}</p>
                <p>{order.shipping_address?.address_line2}</p>
                <p>
                  {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.pincode}
                </p>
                <p>{order.shipping_address?.country}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Billing Address
              </h2>
              <div className="text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">{order.billing_address?.name}</p>
                <p className="mb-1">{order.billing_address?.phone}</p>
                <p>{order.billing_address?.address_line1}</p>
                <p>{order.billing_address?.address_line2}</p>
                <p>
                  {order.billing_address?.city}, {order.billing_address?.state} {order.billing_address?.pincode}
                </p>
                <p>{order.billing_address?.country}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {(() => {
                    const subtotal = Number(order.subtotal || 0);
                    const tax = Number(order.tax_amount || 0);
                    const shipping = Number(order.shipping_amount || 0);
                    const total = Number(order.total_amount || 0);
                    const beDiscount = Number(order.discount_amount || 0);
                    const derivedDiscount = Math.max(0, subtotal + tax + shipping - total);
                    const discountToShow = beDiscount > 0 ? beDiscount : derivedDiscount;
                    return (
                      <>
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal</span>
                          <span className="font-semibold">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Tax</span>
                          <span className="font-semibold">{formatPrice(tax)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Shipping</span>
                          <span className="font-semibold">{shipping === 0 ? (<span className="text-green-600">FREE</span>) : formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span className="font-semibold">-{formatPrice(discountToShow)}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method</span>
                    <span className="font-medium text-gray-900 capitalize">{(order.payment_method).replace("_", " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full capitalize">{(order.payment_status).replace("_", " ")}</span>
                  </div>
                </div>
              </div>

              {canCancel && (
                <div className="pt-6 border-t border-gray-200 space-y-3">
                  <textarea value={cancelNotes} onChange={(e) => setCancelNotes(e.target.value)} rows="2" className="w-full border rounded-lg px-3 py-2" placeholder="Reason for cancellation (optional)" />
                  <button disabled={cancelling} onClick={handleCancel} className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-60">
                    {cancelling ? 'Cancelling…' : 'Cancel Order'}
                  </button>
                </div>
              )}

              {canReturn && (
                <div className="pt-4">
                  <button onClick={handleReturn} className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">Request Return</button>
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Need Assistance?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+91 1800-123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>support@ceramicry.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

function generateInvoice(order) {
  try {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;

    // ===== HEADER =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("CERAMICRY", margin, y);

    try {
      const img = new Image();
      img.src = "/logo.png";
      doc.addImage(img, "PNG", pageWidth - 130, y - 20, 80, 80);
    } catch {}
    y += 30;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Ceramicry Pvt. Ltd.", margin, y);
    y += 12;
    doc.text("123 Design Street, New Delhi, India - 110001", margin, y);
    y += 12;
    doc.text("GSTIN: 22ABCDE1234F1Z5 | CIN: U12345DL2023PTC123456", margin, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("TAX INVOICE", margin, y);
    y += 20;

    // ===== ORDER DETAILS =====
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Order No: ${order.order_number || order.id}`, margin, y);
    doc.text(
      `Date: ${new Date(order.created_at).toLocaleDateString("en-IN")}`,
      pageWidth - 180,
      y
    );
    y += 20;

    // ===== BILLING & SHIPPING =====
    doc.setFont("helvetica", "bold");
    doc.text("Billing Address:", margin, y);
    doc.text("Shipping Address:", pageWidth / 2, y);
    y += 16;

    doc.setFont("helvetica", "normal");
    const bill = order.billing_address || {};
    const ship = order.shipping_address || {};

    const drawAddress = (x, a) => {
      const lines = [
        a.name,
        a.phone,
        a.address_line1,
        a.address_line2,
        `${a.city || ""}, ${a.state || ""} - ${a.pincode || ""}`,
        a.country,
      ].filter(Boolean);
      let yy = y;
      lines.forEach((t) => {
        doc.text(String(t), x, yy);
        yy += 12;
      });
      return yy;
    };

    // ===== BILL & SHIP ADDRESSES =====
    const yBill = drawAddress(margin, bill);
    const yShip = drawAddress(pageWidth / 2, ship);
    y = Math.max(yBill, yShip) + 25;

    // ===== ITEMS TABLE HEADER =====
    const tableTop = y;
    const colX = {
      sno: margin + 5,
      item: margin + 50,
      qty: pageWidth - 240,
      price: pageWidth - 160,
      total: pageWidth - 80,
    };

    // Draw shaded header background
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y - 10, pageWidth - 2 * margin, 24, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const headerY = y + 6;
    doc.text("S.No", colX.sno, headerY);
    doc.text("Item Description", colX.item, headerY);
    doc.text("Qty", colX.qty, headerY);
    doc.text("Price", colX.price, headerY);
    doc.text("Total", colX.total, headerY);

    y += 24;
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    let index = 1;

    (order.order_items || []).forEach((it, rowIndex) => {
      if (y > pageHeight - 100) {
        doc.addPage();
        y = margin + 20;

        // Repeat table header
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, y - 10, pageWidth - 2 * margin, 24, "F");
        doc.setFont("helvetica", "bold");
        doc.text("S.No", colX.sno, y + 5);
        doc.text("Item Description", colX.item, y + 5);
        doc.text("Qty", colX.qty, y + 5);
        doc.text("Price", colX.price, y + 5);
        doc.text("Total", colX.total, y + 5);
        y += 30;
        doc.setFont("helvetica", "normal");
      }

      // Alternating background (zebra rows)
      if (rowIndex % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, y - 8, pageWidth - 2 * margin, 22, "F");
      }

      const name = it.product_name_with_variant || it.product_name;
      const qty = String(it.quantity || 0);
      const price = String(it.unit_price);
      const total = String(it.total_price);

      const lines = doc.splitTextToSize(name, colX.qty - colX.item - 10);
      const lineHeight = 12;

      // Draw table content
      doc.text(String(index++), colX.sno, y + 4);
      doc.text(lines, colX.item, y + 4);
      doc.text(qty, colX.qty, y + 4);
      doc.text(price, colX.price, y + 4, { align: "right" });
      doc.text(total, colX.total, y + 4, { align: "right" });

      y += lines.length * lineHeight;
    });

    // ===== TABLE BORDER =====
    doc.setLineWidth(0.5);
    doc.line(margin, tableTop - 10, pageWidth - margin, tableTop - 10); // top
    doc.line(margin, y, pageWidth - margin, y); // bottom
    doc.line(margin, tableTop - 10, margin, y); // left
    doc.line(pageWidth - margin, tableTop - 10, pageWidth - margin, y); // right
    y += 25;

    // ===== SUMMARY SECTION =====
    const summaryX = pageWidth - 220;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    const summary = [
      ["Subtotal", order.subtotal],
      ["Tax", order.tax_amount],
      ["Shipping", order.shipping_amount],
      ["Discount", -Math.abs(order.discount_amount || 0)],
    ];

    summary.forEach(([label, val]) => {
      doc.text(label, summaryX, y);
      doc.text(String(val), pageWidth - margin, y, { align: "right" });
      y += 16;
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Grand Total", summaryX, y);
    doc.text(String(order.total_amount), pageWidth - margin, y, {
      align: "right",
    });

    y += 12;

    // ===== FOOTER =====
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.line(margin, pageHeight - 80, pageWidth - margin, pageHeight - 80);
    doc.text(
      "Thank you for shopping with Ceramicry!",
      margin,
      pageHeight - 60
    );
    doc.text(
      "For returns or queries, contact: support@ceramicry.com | +91 99999 99999",
      margin,
      pageHeight - 45
    );
    doc.text(
      "This is a computer-generated invoice and does not require a physical signature.",
      margin,
      pageHeight - 30
    );

    // ===== SAVE =====
    doc.save(`invoice-${order.order_number || order.id}.pdf`);
  } catch (err) {
    console.error("Error generating invoice:", err);
  }
}