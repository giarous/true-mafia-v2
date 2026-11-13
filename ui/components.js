import React, { createContext, useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { colors } from "./theme";

// Measure the usable area, including Android resize when the keyboard opens.
const LayoutContext = createContext({ compact: false, dense: false });
export function Screen({ children, centered = false, branded = true }) {
  const [height, setHeight] = useState(800);
  const compact = height < 660;
  const dense = height < 430;
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View
          testID="screen-viewport"
          onLayout={event => setHeight(event.nativeEvent.layout.height)}
          style={styles.screen}
        >
          <LayoutContext.Provider value={{ compact, dense }}>
            <View
              testID="screen-content"
              style={[
                styles.content,
                compact && styles.compactContent,
                centered && styles.centered
              ]}
            >
              {branded && !dense && (
                <View style={[styles.brand, compact && { marginBottom: 12 }]}>
                  <Image
                    source={require("../resources/true_story.jpg")}
                    style={styles.brandLogo}
                  />
                  <Text style={styles.brandText}>TRUE STORY · V2</Text>
                </View>
              )}
              {children}
            </View>
          </LayoutContext.Provider>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Heading({ eyebrow, title, subtitle }) {
  const { compact, dense } = useContext(LayoutContext);
  return (
    <View style={[styles.heading, compact && { marginBottom: dense ? 6 : 12 }]}>
      {!dense && !!eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text
        accessibilityRole="header"
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        style={[
          styles.title,
          compact && { fontSize: dense ? 20 : 27, lineHeight: dense ? 24 : 32 }
        ]}
      >
        {title}
      </Text>
      {!compact && !!subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
}

export function Action({ children, onPress, secondary = false }) {
  const { dense } = useContext(LayoutContext);
  return (
    <TouchableHighlight
      accessibilityRole="button"
      onPress={onPress}
      underlayColor={secondary ? colors.elevated : colors.redPressed}
      style={[
        styles.action,
        dense && { minHeight: 36, paddingVertical: 6, marginBottom: 6 },
        secondary && styles.secondary
      ]}
    >
      <View style={styles.actionContent}>
        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.actionText}>
          {children}
        </Text>
        <Text accessible={false} style={styles.arrow}>
          →
        </Text>
      </View>
    </TouchableHighlight>
  );
}

export function Card({ children, fill = false }) {
  const { compact } = useContext(LayoutContext);
  return (
    <View
      style={[
        styles.card,
        compact && { padding: 12, marginBottom: 12 },
        fill && styles.fill
      ]}
    >
      {children}
    </View>
  );
}

export function Phase({ eyebrow, title, subtitle, children, symbol = "☾" }) {
  return (
    <Screen centered>
      <View style={[styles.phaseIcon, { flexShrink: 1 }]}>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      {children}
    </Screen>
  );
}

export function RoleCard({ eyebrow, name, role, image, children }) {
  return (
    <Screen>
      <Heading
        eyebrow={eyebrow}
        title={name}
        subtitle="For your eyes only. Keep your identity secret."
      />
      <Card fill>
        <Image source={image} style={styles.roleImage} resizeMode="contain" />
        <Text style={styles.eyebrow}>IDENTITY</Text>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.roleName}>
          {role}
        </Text>
      </Card>
      {children}
      <Text style={styles.footnote}>Confirm before passing the phone.</Text>
    </Screen>
  );
}

// Keep the original seating order while sharing selection presentation.
const seats = [[1, 10], [2, 9], [3, 8], [4, 7], [5, 6]];
export function PlayerPicker({ players, selected, onSelect }) {
  const { compact, dense } = useContext(LayoutContext);
  return (
    <View testID="player-picker" style={styles.seats}>
      {seats.map((row, index) => (
        <View key={index} style={styles.seatRow}>
          {row.map(number => {
            const active = selected === number;
            return (
              <TouchableHighlight
                key={number}
                accessibilityRole="button"
                accessibilityLabel={`Player ${number}, ${
                  players[number - 1].name
                }`}
                accessibilityState={{ selected: active }}
                underlayColor={colors.redSoft}
                onPress={() => onSelect(number)}
                style={[
                  styles.seat,
                  compact && { padding: 4 },
                  active && styles.selectedSeat
                ]}
              >
                <View>
                  <View style={styles.seatTop}>
                    <Text
                      style={[
                        styles.seatNumber,
                        dense && { fontSize: 14 },
                        active && styles.selectedNumber
                      ]}
                    >
                      {String(number).padStart(2, "0")}
                    </Text>
                    {active && <Text style={styles.check}>✓</Text>}
                  </View>
                  {!dense && (
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.seatName,
                        compact && {
                          fontSize: 11,
                          lineHeight: 14,
                          marginTop: 2
                        }
                      ]}
                    >
                      {players[number - 1].name}
                    </Text>
                  )}
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    minHeight: 0,
    padding: 20,
    paddingBottom: 12,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center"
  },
  compactContent: { padding: 12 },
  fill: { flex: 1, minHeight: 0 },
  brandLogo: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  centered: { justifyContent: "center" },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap"
  },
  brandMark: {
    width: 8,
    height: 18,
    backgroundColor: colors.red,
    borderRadius: 2,
    marginRight: 9
  },
  brandText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2
  },
  brandCaption: {
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1,
    marginLeft: 12,
    marginVertical: 6
  },
  heading: { marginBottom: 24 },
  eyebrow: {
    color: "#FF687B",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 10
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: -0.8
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 24
  },
  action: {
    backgroundColor: colors.red,
    borderRadius: 14,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  actionText: { color: colors.text, fontSize: 15, fontWeight: "700", flex: 1 },
  arrow: { color: colors.text, fontSize: 21, marginLeft: 12 },
  phaseIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.redSoft,
    borderColor: "#602330",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28
  },
  symbol: { fontSize: 40, color: "#FF687B" },
  roleImage: {
    width: "100%",
    flex: 1,
    minHeight: 0,
    marginBottom: 12,
    borderRadius: 12
  },
  roleName: { color: colors.text, fontSize: 30, fontWeight: "800" },
  footnote: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8
  },
  seats: { flex: 1, minHeight: 0, marginBottom: 8 },
  seatRow: {
    flex: 1,
    minHeight: 0,
    flexDirection: "row",
    marginHorizontal: -4
  },
  seat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 8,
    margin: 4,
    minHeight: 0,
    justifyContent: "center"
  },
  selectedSeat: { backgroundColor: colors.redSoft, borderColor: colors.red },
  seatTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  seatNumber: { color: colors.muted, fontSize: 20, fontWeight: "800" },
  selectedNumber: { color: colors.text },
  check: { color: "#FF687B", fontWeight: "800", fontSize: 18 },
  seatName: { color: colors.text, fontSize: 13, lineHeight: 18, marginTop: 6 }
});
