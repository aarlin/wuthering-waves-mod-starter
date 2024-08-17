"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatTeamTipsContent = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ChatContentBase_1 = require("./ChatContentBase");
class ChatTeamTipsContent extends ChatContentBase_1.ChatContentBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
		];
	}
	OnStart() {
		this.bl();
	}
	bl() {
		switch (this.ChatContentData.NoticeType) {
			case Protocol_1.Aki.Protocol.FGs.Proto_EnterTeam:
				var t = this.GetItem(1),
					e = this.GetItem(3),
					i = this.GetText(4),
					a = this.ChatContentData.SenderPlayerName;
				t.SetUIActive(!1),
					e.SetUIActive(!0),
					LguiUtil_1.LguiUtil.SetLocalText(i, "PlayerEnterTeam", a);
				break;
			case Protocol_1.Aki.Protocol.FGs.Proto_ExitTeam:
				(t = this.GetItem(1)),
					(e = this.GetItem(3)),
					(i = this.GetText(2)),
					(a = this.ChatContentData.SenderPlayerName),
					t.SetUIActive(!0),
					e.SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalText(i, "PlayerLeaveTeam", a);
		}
		this.XMt();
	}
	XMt() {
		var t = this.GetText(0),
			e = this.ChatContentData.TimeStamp,
			i = this.ChatContentData.LastTimeStamp,
			a = TimeUtil_1.TimeUtil.GetServerTime();
		e - i < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && 0 !== i
			? t.SetUIActive(!1)
			: ((i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(e)),
				(e = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(a)),
				i.Day === e.Day
					? (LguiUtil_1.LguiUtil.SetLocalText(t, "HourText", i.Hour, i.Minute),
						t.SetUIActive(!0))
					: i.Day !== e.Day && i.Year === e.Year
						? (LguiUtil_1.LguiUtil.SetLocalText(
								t,
								"DayText",
								i.Month,
								i.Day,
								i.Hour,
								i.Minute,
							),
							t.SetUIActive(!0))
						: i.Year !== e.Year
							? (LguiUtil_1.LguiUtil.SetLocalText(
									t,
									"YearText",
									i.Year,
									i.Month,
									i.Day,
									i.Hour,
									i.Minute,
								),
								t.SetUIActive(!0))
							: t.SetUIActive(!1));
	}
}
exports.ChatTeamTipsContent = ChatTeamTipsContent;
