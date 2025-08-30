import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Ionicons
                key={i}
                name={i <= rating ? "star" : "star-outline"}
                size={16}
                color={i <= rating ? "#FFC107" : "#D3D3D3"}
            />
        );
    }
    return <View style={styles.starContainer}>{stars}</View>;
};

const SkillRating = ({ skill, rating, description }) => (
    <View style={styles.skillRow}>
        <View>
            <Text style={styles.skillTitle}>{skill}</Text>
            <Text style={styles.skillDescription}>{description}</Text>
        </View>
        <Text style={styles.skillRating}>{rating}</Text>
    </View>
);

const GoalItem = ({ goal, status }) => (
    <View style={styles.goalRow}>
        <Text style={styles.goalText}>{goal}</Text>
        <Text style={[styles.goalStatus, status === 'Completed' && styles.goalStatusCompleted]}>
            {status}
        </Text>
    </View>
);

const PerformanceChart = () => {
    // SVG path data for a curved line chart
    const pathData = "M 0 50 C 40 20, 80 80, 120 40 C 160 10, 200 60, 240 30 C 280 10, 320 60, 360 30";
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    return (
        <View style={styles.chartContainer}>
            <Svg height="100" width="100%" viewBox="0 0 360 100">
                <Path
                    d={pathData}
                    fill="none"
                    stroke="#FFC107"
                    strokeWidth="2"
                />
                <Path
                    d={pathData}
                    fill="rgba(255, 193, 7, 0.2)"
                />
            </Svg>
            <View style={styles.monthLabels}>
                {months.map((month, index) => (
                    <Text key={index} style={styles.monthText}>{month}</Text>
                ))}
            </View>
        </View>
    );
};

export default function PerformanceScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text style={styles.headerTitle}>Performance</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Overall Performance Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Overall Performance</Text>
                <View style={styles.overallRating}>
                    <Text style={styles.mainRating}>4.5</Text>
                    <StarRating rating={4.5} />
                </View>
                <View style={styles.ratingBarContainer}>
                    <Text style={styles.ratingBarLabel}>5</Text>
                    <View style={styles.ratingBar}>
                        <View style={[styles.ratingBarFill, { width: '50%' }]} />
                    </View>
                    <Text style={styles.ratingBarPercentage}>50%</Text>
                </View>
                <View style={styles.ratingBarContainer}>
                    <Text style={styles.ratingBarLabel}>4</Text>
                    <View style={styles.ratingBar}>
                        <View style={[styles.ratingBarFill, { width: '40%' }]} />
                    </View>
                    <Text style={styles.ratingBarPercentage}>40%</Text>
                </View>
                <View style={styles.ratingBarContainer}>
                    <Text style={styles.ratingBarLabel}>3</Text>
                    <View style={styles.ratingBar}>
                        <View style={[styles.ratingBarFill, { width: '0%' }]} />
                    </View>
                    <Text style={styles.ratingBarPercentage}>0%</Text>
                </View>
                <View style={styles.ratingBarContainer}>
                    <Text style={styles.ratingBarLabel}>2</Text>
                    <View style={styles.ratingBar}>
                        <View style={[styles.ratingBarFill, { width: '0%' }]} />
                    </View>
                    <Text style={styles.ratingBarPercentage}>0%</Text>
                </View>
                <View style={styles.ratingBarContainer}>
                    <Text style={styles.ratingBarLabel}>1</Text>
                    <View style={styles.ratingBar}>
                        <View style={[styles.ratingBarFill, { width: '0%' }]} />
                    </View>
                    <Text style={styles.ratingBarPercentage}>0%</Text>
                </View>
            </View>

            {/* Specific Skills Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Specific Skills Ratings</Text>
                <SkillRating skill="Communication" description="Excellent" rating="5" />
                <SkillRating skill="Teamwork" description="Good" rating="4" />
                <SkillRating skill="Problem Solving" description="Satisfactory" rating="3" />
            </View>

            {/* Manager Feedback Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Manager Feedback</Text>
                <Text style={styles.feedbackText}>
                    Dillon consistently demonstrates strong communication skills and is a valuable team player. His problem-solving abilities are satisfactory and could be improved with further training.
                </Text>
                <View style={styles.managerInfo}>
                    <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.managerImage} />
                    <View style={styles.managerDetails}>
                        <Text style={styles.managerName}>Manager Alex</Text>
                        <Text style={styles.feedbackDate}>2 month ago</Text>
                    </View>
                </View>
            </View>

            {/* Goals & Objectives Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Goals & Objectives</Text>
                <GoalItem goal="Complete project X by Q4" status="Completed" />
                <GoalItem goal="Improve Customer satisfaction" status="Ongoing" />
            </View>

            {/* Performance History Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Performance History</Text>
                <Text style={styles.performanceTrendTitle}>Performance Trend</Text>
                <Text style={styles.performanceTrendValue}>4.2</Text>
                <Text style={styles.performanceTrendSubtext}>Last 3-month: +2%</Text>
                <PerformanceChart />
            </View>

            {/* Save & Continue Button */}
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>save & Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    overallRating: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 10,
    },
    mainRating: {
        fontSize: 40,
        fontWeight: 'bold',
        marginRight: 10,
    },
    starContainer: {
        flexDirection: 'row',
    },
    ratingBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingBarLabel: {
        width: 15,
        marginRight: 10,
        textAlign: 'right',
    },
    ratingBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
    },
    ratingBarFill: {
        height: '100%',
        backgroundColor: '#FFC107',
        borderRadius: 4,
    },
    ratingBarPercentage: {
        marginLeft: 10,
        fontSize: 12,
    },
    skillRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    skillTitle: {
        fontWeight: 'bold',
    },
    skillDescription: {
        fontSize: 12,
        color: '#888',
    },
    skillRating: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    feedbackText: {
        lineHeight: 20,
        color: '#555',
    },
    managerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    managerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    managerDetails: {
        flex: 1,
    },
    managerName: {
        fontWeight: 'bold',
    },
    feedbackDate: {
        fontSize: 12,
        color: '#888',
    },
    goalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    goalText: {
        flex: 1,
    },
    goalStatus: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFC107',
    },
    goalStatusCompleted: {
        color: '#28a745',
    },
    performanceTrendTitle: {
        fontSize: 12,
        color: '#888',
    },
    performanceTrendValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    performanceTrendSubtext: {
        fontSize: 12,
        color: '#28a745',
    },
    chartContainer: {
        marginTop: 10,
    },
    monthLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    monthText: {
        fontSize: 10,
        color: '#888',
    },
    saveButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); s