"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTurntableGrid = exports.ActivityTurntableComponent = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	TURNTABLE_GRID_SIZE = 8,
	ROTATE_DEFAULT_ANGLE = -90,
	ROTATE_GRID_ANGLE = -45,
	ROTATE_LOOP_ANIMATION_TIME = 500,
	TURNTABLE_ROTATE_PARAM = "TurntableRotate";
class ActivityTurntableComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.sOe = []),
			(this.LevelSequencePlayer = void 0),
			(this.fRn = void 0),
			(this.ddo = 0),
			(this.pRn = 0),
			(this.vRn = new UE.Rotator()),
			(this.Activate = !0),
			(this.Uqn = 0),
			(this.MRn = (e) => {
				"TurntableRotate" === e && this.Activate && this.SRn(this.pRn);
			}),
			(this.ERn = (e, t) => {
				(this.ddo += e),
					(e = Math.min(this.ddo / this.Uqn, 1)),
					(this.vRn.Pitch = 0),
					(this.vRn.Roll = 0),
					(this.vRn.Yaw = e * t),
					this.GetItem(8).SetUIRelativeRotation(this.vRn),
					this.ddo >= this.Uqn && this.yRn();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		var e = [];
		for (const t of [(this.sOe.length = 0), 1, 2, 3, 4, 5, 6, 7])
			e.push(this.rOe(this.GetItem(t).GetOwner()));
		await Promise.all(e),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			(this.Uqn =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"TurntableActivitytRotateLoopTime",
				) ?? 500);
	}
	async rOe(e) {
		var t = new ActivityTurntableGrid();
		await t.CreateThenShowByActorAsync(e), this.sOe.push(t);
	}
	OnBeforeShow() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
			this.MRn,
		);
	}
	OnBeforeHide() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
			this.MRn,
		);
	}
	OnBeforeDestroy() {
		this.yRn();
	}
	async Refresh(e) {
		if (8 !== e.length)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Activity", 38, "[转盘活动] 转盘奖励数量配置不正确", [
					"Count",
					e.length,
				]);
		else {
			var t = [];
			for (let n = 0; n < e.length; n++) {
				var i = this.sOe[n].Refresh(e[n]);
				t.push(i);
			}
			await Promise.all(t);
		}
	}
	RunTurntableByRewardId(e, t) {
		this.IRn(e, t).catch(() => {
			t?.();
		});
	}
	async IRn(e, t) {
		const [i, n, s] = this.TRn(e);
		this.pRn = i;
		let r = "Start01";
		n ? (r = "Start03") : s && (r = "Start02"),
			await this.LRn(r, !0),
			(e = () => {
				this.GetItem(8).SetUIRelativeRotation(new UE.Rotator(0, 0, 0)),
					this.DRn(i),
					t?.();
			}),
			(n &&
				void 0 !==
					UiManager_1.UiManager.OpenViewAsync(
						"ActivityTurntableRewardView",
						e,
					)) ||
				e();
	}
	TRn(e) {
		let t = -1,
			i = !1,
			n = !1;
		for (let s = 0; s < this.sOe.length; s++)
			if (this.sOe[s].RewardId === e) {
				(t = s), (i = this.sOe[s].IsSpecial), (n = this.sOe[s].IsGoldenQuality);
				break;
			}
		return t < 0 ? [-1, i, n] : [-45 * t - 90, i, n];
	}
	SRn(e) {
		0 !== e &&
			(this.DRn(-e),
			(this.ddo = 0),
			(this.fRn = TimerSystem_1.TimerSystem.Forever((t) => {
				this.ERn(t, e);
			}, TimerSystem_1.MIN_TIME)));
	}
	DRn(e) {
		for (const t of this.sOe) t.Rotate(e);
	}
	yRn() {
		TimerSystem_1.TimerSystem.Has(this.fRn) &&
			(TimerSystem_1.TimerSystem.Remove(this.fRn),
			(this.fRn = void 0),
			(this.ddo = 0));
	}
	async LRn(e, t) {
		await this.LevelSequencePlayer.PlaySequenceAsync(
			e,
			new CustomPromise_1.CustomPromise(),
			t,
		);
	}
}
exports.ActivityTurntableComponent = ActivityTurntableComponent;
const REFRESH_LOADING_COUNT = 2;
class ActivityTurntableGrid extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.RewardId = 0),
			(this.IsGoldenQuality = !1),
			(this.IsSpecial = !1),
			(this.gIt = 0),
			(this.M5s = () => {
				this.gIt &&
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						this.gIt,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[5, this.M5s]]);
	}
	async Refresh(e) {
		(this.RewardId = e.Id), (this.IsSpecial = e.IsSpecial);
		let t = 0;
		const i = new CustomPromise_1.CustomPromise();
		var n = () => {
				2 == ++t && i.SetResult();
			},
			s =
				((this.gIt = e.RewardItem[0].ItemId),
				this.SetItemIcon(this.GetTexture(0), this.gIt, void 0, n),
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					e.RewardItem[0].ItemId,
				));
		(s = s?.QualityId ?? 0),
			(this.IsGoldenQuality = 5 === s),
			(s = "SP_TurntableQuality" + s),
			(s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s));
		this.SetSpriteByPath(s, this.GetSprite(1), !1, void 0, n),
			this.GetText(2).SetText(e.RewardItem[1].toString()),
			this.SetRewardClaimed(e.IsClaimed),
			await i.Promise;
	}
	SetRewardClaimed(e) {
		this.GetTexture(0).SetUIActive(!e),
			this.GetItem(3).SetUIActive(e),
			this.GetItem(4).SetUIActive(!e);
	}
	Rotate(e) {
		(e = this.GetItem(4).RelativeRotation.Yaw + e),
			this.GetItem(4).SetUIRelativeRotation(new UE.Rotator(0, e, 0));
	}
}
exports.ActivityTurntableGrid = ActivityTurntableGrid;
