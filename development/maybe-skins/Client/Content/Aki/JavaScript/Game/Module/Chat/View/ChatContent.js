"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatContent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ChatContentBase_1 = require("./ChatContentBase");
class ChatContent extends ChatContentBase_1.ChatContentBase {
	constructor() {
		super(...arguments),
			(this.WMt = void 0),
			(this.EPe = void 0),
			(this.KMt = () => {
				this.QMt(), this.x9e(), this.pbn();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UITexture],
			[5, UE.UIItem],
			[6, UE.UIText],
		];
	}
	OnStart() {
		var e = this.GetItem(0);
		(this.WMt = new PlayerHeadItem_1.PlayerHeadItem(e.GetOwner())),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.bl(),
			this.Ore();
	}
	OnBeforeDestroy() {
		(this.WMt = void 0), this.kre();
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChatPlayerInfoChanged,
			this.KMt,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChatPlayerInfoChanged,
			this.KMt,
		);
	}
	bl() {
		this.QMt(), this.L4e(), this.x9e(), this.XMt(), this.pbn();
	}
	QMt() {
		var e = ModelManager_1.ModelManager.PersonalModel,
			t = this.ChatContentData.SenderPlayerId,
			a = e.GetPersonalInfoData();
		a && a.PlayerId === t
			? this.WMt.RefreshByRoleIdUseCard(e.GetHeadPhotoId())
			: (a = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t)) &&
				((e = a?.GetPlayerIcon())
					? this.WMt.RefreshByRoleIdUseCard(e)
					: this.WMt.RefreshByPlayerId(t, !0));
	}
	L4e() {
		var e,
			t,
			a,
			n = this.GetItem(5);
		const i = this.GetItem(3);
		this.ChatContentData.ContentType === Protocol_1.Aki.Protocol.U3n.nMs &&
			((e = this.GetText(1)),
			(t = this.ChatContentData.Content),
			e.SetText(t),
			n.SetUIActive(!0),
			i.SetUIActive(!1)),
			this.ChatContentData.ContentType ===
				Protocol_1.Aki.Protocol.U3n.Proto_Emoji &&
				((e = this.GetTexture(4)),
				(t = Number(this.ChatContentData.Content)),
				((a = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(t))
					? ((a = a.ExpressionTexturePath),
						this.SetTextureByPath(a, e, void 0, (e) => {
							i.SetUIActive(e);
						}),
						n)
					: (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Chat", 8, "表情表找不到对应的Id", [
								"expressionId",
								t,
							]),
						n.SetUIActive(!1),
						i)
				).SetUIActive(!1));
	}
	x9e() {
		var e = this.ChatContentData.SenderPlayerId,
			t = this.GetText(6),
			a = this.ChatContentData.ChatRoomType;
		if (2 === a || 3 === a) {
			if (
				(a = ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData()) &&
				a.PlayerId === e
			)
				t.SetText(a.Name);
			else if ((a = ModelManager_1.ModelManager.FriendModel.GetFriendById(e))) {
				var n = a.FriendRemark;
				StringUtils_1.StringUtils.IsEmpty(n)
					? t.SetText(a.PlayerName)
					: t.SetText(n);
			} else {
				if (!(a = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(e)))
					return void t.SetUIActive(!1);
				t.SetText(a.GetPlayerName());
			}
			t.SetUIActive(!0);
		} else t.SetUIActive(!1);
	}
	XMt() {
		var e = this.GetText(2),
			t = this.ChatContentData.TimeStamp,
			a = this.ChatContentData.LastTimeStamp,
			n = TimeUtil_1.TimeUtil.GetServerTime();
		t - a < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && 0 !== a
			? e.SetUIActive(!1)
			: ((a = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(t)),
				(t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(n)),
				a.Year === t.Year && a.Month === t.Month && a.Day === t.Day
					? (LguiUtil_1.LguiUtil.SetLocalText(e, "HourText", a.Hour, a.Minute),
						e.SetUIActive(!0))
					: (a.Month === t.Month && a.Day === t.Day) || a.Year !== t.Year
						? a.Year !== t.Year
							? (LguiUtil_1.LguiUtil.SetLocalText(
									e,
									"YearText",
									a.Year,
									a.Month,
									a.Day,
									a.Hour,
									a.Minute,
								),
								e.SetUIActive(!0))
							: e.SetUIActive(!1)
						: (LguiUtil_1.LguiUtil.SetLocalText(
								e,
								"DayText",
								a.Month,
								a.Day,
								a.Hour,
								a.Minute,
							),
							e.SetUIActive(!0)));
	}
	pbn() {
		this.EPe?.PlayLevelSequenceByName("Start");
	}
}
exports.ChatContent = ChatContent;
