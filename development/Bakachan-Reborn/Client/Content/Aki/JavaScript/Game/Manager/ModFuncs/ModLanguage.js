"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModLanguage = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	ModManager_1 = require("../ModManager"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
var CurrLang = "en";
class ModLanguage {
	static GetCurrLang() {
		return (CurrLang = LanguageSystem_1.LanguageSystem.PackageLanguage);
	}
	static Langs = ["en", "zh-Hans", "ja"];
	static translate = [
		{ en: "HitMultiplier[F6]", chs: "多倍攻击[F6]", ja: "ヒット倍率[F6]" },
		{ en: "GodMode[F5]", chs: "无敌模式[F5]", ja: "神モードやで[F5]" },
		{
			en: "AutoPickTreasure[F7]",
			chs: "拾取宝箱[F7]",
			ja: "自動で宝を拾うんや[F7]",
		},
		{ en: "AutoAbsorb[F8]", chs: "自动吸收[F8]", ja: "自動で吸収すんや" },
		{ en: "killAura[F9]", chs: "杀戮光环[F9]", ja: "キルオーラやで[F9]" },
		{ en: "InfiniteStamina", chs: "InfiniteStamina", ja: "InfiniteStamina" },
		{
			en: "PerceptionRange[F10]",
			chs: "感知范围[F10]",
			ja: "感知範囲やで[F10]",
		},
		{ en: "NoCD[F11]", chs: "无冷却[F11]", ja: "クールダウンなしやで[F11]" },
		{
			en: "PlayerSpeed[F12]",
			chs: "玩家速度[F12]",
			ja: "プレイヤーのスピードやで[F12]",
		},
		{
			en: "CustomTp[Ins]",
			chs: "自定义传送[Ins]",
			ja: "てきとうな瞬間移動[Ins]",
		},
		{ en: "AutoLoot[Num0]", chs: "自动拾取[Num0]", ja: "自動あっぷる[Num0]" },
		{
			en: "KunMods v1.1 <color=red>Fix by Succubus</color> [Home] NoACE : <color=green>ON</color> ",
			chs: "坤模组状态 <color=green>WuWa v1.1</color> [Home] 安全保护 : <color=green>开启</color> ",
			ja: "KunMods 状態 <color=green>WuWa v1.1</color>  [Home] アンチチート無効化 : <color=green>オン</color>",
		},
		{
			en: " : <color=green>ON</color> |",
			chs: " : <color=green>开启</color> |",
			ja: "<color=green>オン</color>",
		},
		{
			en: " : <color=red>OFF</color> |",
			chs: " : <color=red>关闭</color> |",
			ja: "<color=red>オフ</color>",
		},
		{ en: "ON", chs: "开启", ja: "オン" },
		{ en: "OFF", chs: "关闭", ja: "オフ" },
		{ en: "GodMode", chs: "无敌模式", ja: "神モードやで" },
		{ en: "HitMultiplier", chs: "多倍攻击", ja: "ヒット倍率" },
		{ en: "AutoPickTreasure", chs: "拾取宝箱", ja: "自動で宝を拾うんや" },
		{ en: "AutoAbsorb", chs: "自动吸收", ja: "自動で吸収すんや" },
		{ en: "killAura", chs: "杀戮光环", ja: "キルオーラやで" },
		{ en: "PerceptionRange", chs: "感知范围", ja: "感知範囲やで" },
		{ en: "NoCD", chs: "无冷却", ja: "クールダウンなしやで" },
		{ en: "PlayerSpeed", chs: "玩家速度", ja: "プレイヤーのスピードやで" },
		{ en: "CustomTp", chs: "自定义传送", ja: "てきとうな瞬間移動" },
		{ en: "AutoLoot", chs: "自动拾取:", ja: "自動あっぷる" },
		{
			en: "CustomTp State [Insert]:",
			chs: "自定义传送状态[Insert]:",
			ja: "カスタムテレポートの状態[Insert]",
		},
		{ en: "Shows[Delete]", chs: "显示[Delete]", ja: "ショー[Delete]" },
		{ en: "CurrentFile:", chs: "当前文件:", ja: "今のファイル" },
		{
			en: "| PreviousFile[PageUp]: ",
			chs: "| 上一个文件[PageUp]:",
			ja: "| 前のファイル[PageUp]",
		},
		{
			en: " | NextFile[PageDown]: ",
			chs: " | 下一个文件[PageDown]:",
			ja: " | つぎのファイル[PageDown]",
		},
		{
			en: " | PreviousPos[Up]: ",
			chs: " | 上一个位置[Up]:",
			ja: " |前のポジション[Up]",
		},
		{
			en: " | NextPos[Down]: ",
			chs: " | 下一个位置[Down]:",
			ja: " |つぎのポジション[Down]",
		},
		{ en: "AntiDither[Num1]", chs: "反虚化[Num1]", ja: "アンチディザ[Num1]" },
		{ en: "AntiDither", chs: "反虚化", ja: "アンチディザ" },
		{
			en: "Please enter hit count",
			chs: "请输入攻击次数",
			ja: "ヒット数入れてや",
		},
		{
			en: "HitMultiplier:Please enter hit count",
			chs: "倍数攻击：请输入攻击次数",
			ja: "ヒットの倍率や：ヒット数入れてや",
		},
		{
			en: " | SetDelay[Left]: ",
			chs: " | 延迟[Left]: ",
			ja: " | SetDelay[Left]: ",
		},
		{
			en: " | Select[Right]: ",
			chs: " | 选择pos[Right]: ",
			ja: " | Select[Right]: ",
		},
		{ en: "is the last file", chs: "这是最后一个文件", ja: "is the last file" },
		{ en: "is the first file", chs: "这是第一个文件", ja: "is the first file" },
		{ en: "is the last pos", chs: "这是最后一个点位", ja: "is the last pos" },
		{ en: "is the first pos", chs: "这是第一个点位", ja: "is the first pos" },
		{
			en: "CustomTp:AutoMode:Set Delay",
			chs: "自定义传送:自动模式:设置延迟",
			ja: "CustomTp:AutoMode:Set Delay",
		},
		{
			en: "Please enter Delay(s)",
			chs: "请输入延迟(秒)",
			ja: "Please enter Delay(s)",
		},
		{ en: "Remaining time", chs: "下一次传送还有", ja: "Remaining time" },
		{ en: "seconds", chs: "秒", ja: "seconds" },
		{ en: "Go", chs: "出发", ja: "Go" },
		{ en: "AutoMode", chs: "自动模式", ja: "AutoMode" },
		{
			en: "CustomTp:CurrPos:Select",
			chs: "自定义传送:当前序号:选择",
			ja: "CustomTp:CurrPos:Select",
		},
		{
			en: "Please enter CurreNum",
			chs: "请输入当前序号",
			ja: "Please enter CurreNum",
		},
		{
			en: " | AutoMode[End]: ",
			chs: " | 自动模式[End]: ",
			ja: " | AutoMode[End]: ",
		},
	];
	static ModTr = (e) => {
		var a = CurrLang;
		for (let n = 0; n < ModLanguage.translate.length; n++) {
			if ("en" === a && ModLanguage.translate[n].en === e)
				return ModLanguage.translate[n].en;
			if ("zh-Hans" === a && ModLanguage.translate[n].en === e)
				return ModLanguage.translate[n].chs;
			if ("ja" === a && ModLanguage.translate[n].en === e)
				return ModLanguage.translate[n].ja;
		}
		return e;
	};
}
exports.ModLanguage = ModLanguage;
