// import paymentService from '@/services/paymentService';
// import { Transaction } from '@/types/payment';
// import { Ionicons } from '@expo/vector-icons';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Image,
//     Modal,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import Toast from 'react-native-toast-message';

// // Transaction Receipt Card Component
// interface TransactionCardProps {
//     transaction: Transaction;
//     onPress: () => void;
// }

// const TransactionCard = ({ transaction, onPress }: TransactionCardProps) => {
//     const getStatusColor = () => {
//         switch (transaction.status) {
//             case 'SUCCESS':
//                 return '#10B981';
//             case 'PENDING':
//                 return '#F59E0B';
//             case 'FAILED':
//                 return '#EF4444';
//             default:
//                 return '#6B7280';
//         }
//     };

//     const getStatusBgColor = () => {
//         switch (transaction.status) {
//             case 'SUCCESS':
//                 return '#D1FAE5';
//             case 'PENDING':
//                 return '#FEF3C7';
//             case 'FAILED':
//                 return '#FEE2E2';
//             default:
//                 return '#F3F4F6';
//         }
//     };

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             month: 'short',
//             day: 'numeric',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     return (
//         <TouchableOpacity style={styles.transactionCard} onPress={onPress}>
//             <View style={styles.transactionHeader}>
//                 <View style={styles.transactionIcon}>
//                     <Ionicons
//                         name={transaction.status === 'SUCCESS' ? 'checkmark-circle' : 'time'}
//                         size={24}
//                         color={getStatusColor()}
//                     />
//                 </View>
//                 <View style={styles.transactionInfo}>
//                     <Text style={styles.transactionProperty} numberOfLines={1}>
//                         {transaction.property?.name || 'Property Purchase'}
//                     </Text>
//                     <Text style={styles.transactionDate}>
//                         {formatDate(transaction.createdAt)}
//                     </Text>
//                 </View>
//                 <View style={styles.transactionRight}>
//                     <Text style={styles.transactionAmount}>
//                         ₦{transaction.amount?.toLocaleString()}
//                     </Text>
//                     <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor() }]}>
//                         <Text style={[styles.statusText, { color: getStatusColor() }]}>
//                             {transaction.status}
//                         </Text>
//                     </View>
//                 </View>
//             </View>

//             {transaction.property && (
//                 <View style={styles.propertyPreview}>
//                     {transaction.property.propertyImageUrl && (
//                         <Image
//                             source={{ uri: transaction.property.propertyImageUrl }}
//                             style={styles.propertyThumbnail}
//                             resizeMode="cover"
//                         />
//                     )}
//                     <View style={styles.propertyDetails}>
//                         <Text style={styles.propertyAddress} numberOfLines={1}>
//                             {transaction.property.address}
//                         </Text>
//                         <Text style={styles.transactionRef} numberOfLines={1}>
//                             Ref: {transaction.transactionReference}
//                         </Text>
//                     </View>
//                 </View>
//             )}
//         </TouchableOpacity>
//     );
// };

// // Transaction Details Modal
// interface TransactionDetailsModalProps {
//     visible: boolean;
//     transaction: Transaction | null;
//     onClose: () => void;
// }

// const TransactionDetailsModal = ({ visible, transaction, onClose }: TransactionDetailsModalProps) => {
//     if (!transaction) return null;

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             month: 'long',
//             day: 'numeric',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     const getStatusColor = () => {
//         switch (transaction.status) {
//             case 'SUCCESS':
//                 return '#10B981';
//             case 'PENDING':
//                 return '#F59E0B';
//             case 'FAILED':
//                 return '#EF4444';
//             default:
//                 return '#6B7280';
//         }
//     };

//     return (
//         <Modal
//             visible={visible}
//             animationType="slide"
//             transparent={true}
//             onRequestClose={onClose}
//         >
//             <View style={styles.modalOverlay}>
//                 <View style={styles.modalContent}>
//                     <View style={styles.modalHeader}>
//                         <Text style={styles.modalTitle}>Transaction Receipt</Text>
//                         <TouchableOpacity onPress={onClose}>
//                             <Ionicons name="close" size={28} color="#333" />
//                         </TouchableOpacity>
//                     </View>

//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         {/* Status Icon */}
//                         <View style={styles.receiptHeader}>
//                             <Ionicons
//                                 name={transaction.status === 'SUCCESS' ? 'checkmark-circle' : 'time-outline'}
//                                 size={64}
//                                 color={getStatusColor()}
//                             />
//                             <Text style={[styles.receiptStatus, { color: getStatusColor() }]}>
//                                 {transaction.status}
//                             </Text>
//                             <Text style={styles.receiptAmount}>
//                                 ₦{transaction.amount?.toLocaleString()}
//                             </Text>
//                         </View>

//                         {/* Transaction Details */}
//                         <View style={styles.receiptSection}>
//                             <Text style={styles.receiptSectionTitle}>Transaction Details</Text>

//                             <View style={styles.receiptRow}>
//                                 <Text style={styles.receiptLabel}>Reference</Text>
//                                 <Text style={styles.receiptValue}>{transaction.transactionReference}</Text>
//                             </View>

//                             <View style={styles.receiptRow}>
//                                 <Text style={styles.receiptLabel}>Date</Text>
//                                 <Text style={styles.receiptValue}>{formatDate(transaction.createdAt)}</Text>
//                             </View>

//                             <View style={styles.receiptRow}>
//                                 <Text style={styles.receiptLabel}>Payment Method</Text>
//                                 <Text style={styles.receiptValue}>
//                                     {transaction.paymentMethod || 'Paystack'}
//                                 </Text>
//                             </View>

//                             <View style={styles.receiptRow}>
//                                 <Text style={styles.receiptLabel}>Email</Text>
//                                 <Text style={styles.receiptValue}>{transaction.email}</Text>
//                             </View>
//                         </View>

//                         {/* Property Details */}
//                         {transaction.property && (
//                             <View style={styles.receiptSection}>
//                                 <Text style={styles.receiptSectionTitle}>Property Details</Text>

//                                 {transaction.property.propertyImageUrl && (
//                                     <Image
//                                         source={{ uri: transaction.property.propertyImageUrl }}
//                                         style={styles.receiptPropertyImage}
//                                         resizeMode="cover"
//                                     />
//                                 )}

//                                 <View style={styles.receiptRow}>
//                                     <Text style={styles.receiptLabel}>Property Name</Text>
//                                     <Text style={styles.receiptValue}>{transaction.property.name}</Text>
//                                 </View>

//                                 <View style={styles.receiptRow}>
//                                     <Text style={styles.receiptLabel}>Address</Text>
//                                     <Text style={styles.receiptValue}>{transaction.property.address}</Text>
//                                 </View>

//                                 <View style={styles.receiptRow}>
//                                     <Text style={styles.receiptLabel}>Property Price</Text>
//                                     <Text style={styles.receiptValue}>
//                                         ₦{transaction.property.price?.toLocaleString()}
//                                     </Text>
//                                 </View>
//                             </View>
//                         )}

//                         {/* Customer Details */}
//                         {transaction.customer && (
//                             <View style={styles.receiptSection}>
//                                 <Text style={styles.receiptSectionTitle}>Customer Details</Text>

//                                 <View style={styles.receiptRow}>
//                                     <Text style={styles.receiptLabel}>Name</Text>
//                                     <Text style={styles.receiptValue}>{transaction.customer.fullName}</Text>
//                                 </View>

//                                 <View style={styles.receiptRow}>
//                                     <Text style={styles.receiptLabel}>Phone</Text>
//                                     <Text style={styles.receiptValue}>
//                                         {transaction.customer.phoneNumber}
//                                     </Text>
//                                 </View>
//                             </View>
//                         )}
//                     </ScrollView>

//                     <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                         <Text style={styles.closeButtonText}>Close</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// export default function PaymentPage() {
//     const [transactions, setTransactions] = useState<Transaction[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
//     const [modalVisible, setModalVisible] = useState(false);

//     useEffect(() => {
//         fetchTransactions();
//     }, []);

//     const fetchTransactions = async (isRefresh = false) => {
//         if (isRefresh) {
//             setRefreshing(true);
//         } else {
//             setIsLoading(true);
//         }

//         try {
//             const result = await paymentService.getUserTransactions();

//             if (result.responseCode === '00') {
//                 const sortedTransactions = (result.responseData || []).sort(
//                     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//                 );
//                 setTransactions(sortedTransactions);

//                 if (isRefresh) {
//                     Toast.show({
//                         type: 'success',
//                         text1: 'Transactions Refreshed',
//                         text2: `Found ${sortedTransactions.length} transaction${sortedTransactions.length !== 1 ? 's' : ''}`
//                     });
//                 }
//             } else {
//                 throw new Error(result.responseMessage || 'Failed to fetch transactions');
//             }
//         } catch (error: any) {
//             console.error('Fetch transactions error:', error);
//             Toast.show({
//                 type: 'error',
//                 text1: 'Error',
//                 text2: error.message || 'Failed to load transactions'
//             });
//             setTransactions([]);
//         } finally {
//             setIsLoading(false);
//             setRefreshing(false);
//         }
//     };

//     const handleRefresh = () => {
//         fetchTransactions(true);
//     };

//     const handleTransactionPress = (transaction: Transaction) => {
//         setSelectedTransaction(transaction);
//         setModalVisible(true);
//     };

//     const handleCloseModal = () => {
//         setModalVisible(false);
//         setSelectedTransaction(null);
//     };

//     // Calculate statistics
//     const successfulTransactions = transactions.filter(t => t.status === 'SUCCESS');
//     const totalPaid = successfulTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
//     const pendingCount = transactions.filter(t => t.status === 'PENDING').length;

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.header}>
//                 <View style={{ width: 28 }} />
//                 <Text style={styles.headerTitle}>Payments</Text>
//                 <TouchableOpacity onPress={handleRefresh} disabled={refreshing}>
//                     <Ionicons
//                         name="refresh-outline"
//                         size={24}
//                         color={refreshing ? '#ccc' : '#DD7800'}
//                     />
//                 </TouchableOpacity>
//             </View>

//             <ScrollView
//                 style={styles.container}
//                 contentContainerStyle={{ paddingBottom: 100 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* Statistics Cards */}
//                 <View style={styles.statsContainer}>
//                     <View style={styles.statCard}>
//                         <Ionicons name="wallet" size={28} color="#DD7800" />
//                         <Text style={styles.statValue}>₦{totalPaid.toLocaleString()}</Text>
//                         <Text style={styles.statLabel}>Total Paid</Text>
//                     </View>
//                     <View style={styles.statCard}>
//                         <Ionicons name="receipt" size={28} color="#10B981" />
//                         <Text style={styles.statValue}>{successfulTransactions.length}</Text>
//                         <Text style={styles.statLabel}>Completed</Text>
//                     </View>
//                     <View style={styles.statCard}>
//                         <Ionicons name="time" size={28} color="#F59E0B" />
//                         <Text style={styles.statValue}>{pendingCount}</Text>
//                         <Text style={styles.statLabel}>Pending</Text>
//                     </View>
//                 </View>

//                 {/* Transactions List */}
//                 <View style={styles.sectionContainer}>
//                     <View style={styles.sectionHeaderRow}>
//                         <Text style={styles.sectionHeader}>Transaction History</Text>
//                         {transactions.length > 0 && (
//                             <Text style={styles.transactionCount}>{transactions.length}</Text>
//                         )}
//                     </View>

//                     {isLoading ? (
//                         <View style={styles.loadingContainer}>
//                             <ActivityIndicator size="large" color="#DD7800" />
//                             <Text style={styles.loadingText}>Loading transactions...</Text>
//                         </View>
//                     ) : transactions.length > 0 ? (
//                         transactions.map((transaction) => (
//                             <TransactionCard
//                                 key={transaction.id}
//                                 transaction={transaction}
//                                 onPress={() => handleTransactionPress(transaction)}
//                             />
//                         ))
//                     ) : (
//                         <View style={styles.emptyContainer}>
//                             <Ionicons name="receipt-outline" size={80} color="#ccc" />
//                             <Text style={styles.emptyText}>No transactions yet</Text>
//                             <Text style={styles.emptySubtext}>
//                                 Your payment history will appear here
//                             </Text>
//                         </View>
//                     )}
//                 </View>
//             </ScrollView>

//             <TransactionDetailsModal
//                 visible={modalVisible}
//                 transaction={selectedTransaction}
//                 onClose={handleCloseModal}
//             />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#FAFAFA',
//         paddingTop: 30
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 20,
//         paddingVertical: 16,
//         backgroundColor: '#FAFAFA',
//     },
//     headerTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     container: {
//         flex: 1,
//         paddingHorizontal: 20,
//     },
//     statsContainer: {
//         flexDirection: 'row',
//         gap: 12,
//         marginTop: 16,
//         marginBottom: 20,
//     },
//     statCard: {
//         flex: 1,
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 16,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.08,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     statValue: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#000',
//         marginTop: 8,
//     },
//     statLabel: {
//         fontSize: 12,
//         color: '#999',
//         marginTop: 4,
//     },
//     sectionContainer: {
//         backgroundColor: '#fff',
//         borderRadius: 20,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.08,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     sectionHeaderRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 16,
//     },
//     sectionHeader: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#000',
//     },
//     transactionCount: {
//         backgroundColor: '#DD7800',
//         color: '#fff',
//         fontSize: 12,
//         fontWeight: '700',
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 12,
//     },
//     loadingContainer: {
//         paddingVertical: 60,
//         alignItems: 'center',
//     },
//     loadingText: {
//         marginTop: 16,
//         fontSize: 16,
//         color: '#666',
//     },
//     emptyContainer: {
//         paddingVertical: 60,
//         alignItems: 'center',
//     },
//     emptyText: {
//         marginTop: 16,
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#333',
//     },
//     emptySubtext: {
//         marginTop: 8,
//         fontSize: 14,
//         color: '#666',
//         textAlign: 'center',
//     },
//     transactionCard: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#F3F4F6',
//         paddingVertical: 16,
//     },
//     transactionHeader: {
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//     },
//     transactionIcon: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: '#F9FAFB',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 12,
//     },
//     transactionInfo: {
//         flex: 1,
//     },
//     transactionProperty: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#000',
//         marginBottom: 4,
//     },
//     transactionDate: {
//         fontSize: 13,
//         color: '#999',
//     },
//     transactionRight: {
//         alignItems: 'flex-end',
//     },
//     transactionAmount: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#DD7800',
//         marginBottom: 6,
//     },
//     statusBadge: {
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 12,
//     },
//     statusText: {
//         fontSize: 11,
//         fontWeight: '700',
//     },
//     propertyPreview: {
//         flexDirection: 'row',
//         marginTop: 12,
//         marginLeft: 52,
//         backgroundColor: '#F9FAFB',
//         borderRadius: 12,
//         padding: 8,
//     },
//     propertyThumbnail: {
//         width: 50,
//         height: 50,
//         borderRadius: 8,
//         marginRight: 12,
//         backgroundColor: '#E5E7EB',
//     },
//     propertyDetails: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     propertyAddress: {
//         fontSize: 13,
//         color: '#666',
//         marginBottom: 4,
//     },
//     transactionRef: {
//         fontSize: 11,
//         color: '#999',
//     },
//     // Modal Styles
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'flex-end',
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingTop: 20,
//         paddingHorizontal: 20,
//         maxHeight: '90%',
//     },
//     modalHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     modalTitle: {
//         fontSize: 24,
//         fontWeight: '700',
//         color: '#000',
//     },
//     receiptHeader: {
//         alignItems: 'center',
//         paddingVertical: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#F3F4F6',
//     },
//     receiptStatus: {
//         fontSize: 20,
//         fontWeight: '700',
//         marginTop: 12,
//         textTransform: 'uppercase',
//     },
//     receiptAmount: {
//         fontSize: 32,
//         fontWeight: '700',
//         color: '#DD7800',
//         marginTop: 8,
//     },
//     receiptSection: {
//         marginTop: 24,
//     },
//     receiptSectionTitle: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: '#000',
//         marginBottom: 16,
//     },
//     receiptRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: '#F3F4F6',
//     },
//     receiptLabel: {
//         fontSize: 14,
//         color: '#999',
//         flex: 1,
//     },
//     receiptValue: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#000',
//         flex: 2,
//         textAlign: 'right',
//     },
//     receiptPropertyImage: {
//         width: '100%',
//         height: 200,
//         borderRadius: 16,
//         marginBottom: 16,
//         backgroundColor: '#E5E7EB',
//     },
//     closeButton: {
//         backgroundColor: '#DD7800',
//         borderRadius: 30,
//         paddingVertical: 16,
//         alignItems: 'center',
//         marginTop: 20,
//         marginBottom: 30,
//     },
//     closeButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
// });
