import React, { useEffect, useState } from "react";
import { ChevronRight, Package, Truck, CheckCircle, Clock, Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../Api";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get(`orders?page=${page}&per_page=${perPage}`, { headers: { Token: `Bearer ${token}` } });
        const list = res.data?.data?.orders || res.data?.data || [];
        setOrders(Array.isArray(list) ? list : []);
        setTotalCount(res.data?.pagination?.total_count ?? list.length);
      } catch (err) {
        setOrders([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800 border-green-200";
      case "Processing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped": return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Transit": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle className="w-4 h-4" />;
      case "Processing": return <Clock className="w-4 h-4" />;
      case "Shipped": return <Truck className="w-4 h-4" />;
      case "In Transit": return <Truck className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-gray-700 mx-auto mb-4" />
        <p className="text-gray-600">Loading orders…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h2>
        <p className="text-gray-600">Track and manage your recent orders</p>
      </div>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900">{totalCount}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-medium">Delivered</p>
              <p className="text-2xl font-bold text-green-900">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 font-medium">Processing</p>
              <p className="text-2xl font-bold text-yellow-900">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium">In Transit</p>
              <p className="text-2xl font-bold text-purple-900">
                {orders.filter(o => o.status === 'out_for_delivery').length}
              </p>
            </div>
            <Truck className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Order {order.order_number || order.id}</h3>
                  {order.created_at && (
                    <p className="text-gray-600 text-sm">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center space-x-2 ${getStatusColor(order.status_display || order.status)}`}>
                  {getStatusIcon(order.status_display || order.status)}
                  <span>{(order.status_display || order.status).replace("_", " ")}</span>
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-3 mb-6">
              {(order.order_items || []).map((oi) => (
                <div key={oi.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{oi.product_name_with_variant || oi.product_name}</p>
                      <p className="text-sm text-gray-600">Quantity: {oi.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatPrice(parseFloat(oi.total_price))}</p>
                    <p className="text-sm text-gray-600">{formatPrice(parseFloat(oi.unit_price))} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-600">{order.total_items} {order.total_items === 1 ? 'item' : 'items'}</div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(parseFloat(order.total_amount))}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => generateInvoice(order)} className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Invoice</span>
                </button>
                <button onClick={() => navigate(`/orders/${order.id}`)} className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalCount > perPage && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-2 border rounded disabled:opacity-50">Prev</button>
          <span className="text-sm text-gray-600">Page {page} of {Math.ceil(totalCount / perPage)}</span>
          <button disabled={page >= Math.ceil(totalCount / perPage)} onClick={() => setPage(p => p + 1)} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
        </div> 
      )}

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Your order history will appear here once you make your first purchase.</p>
          <button onClick={() => navigate("/product")} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;

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
