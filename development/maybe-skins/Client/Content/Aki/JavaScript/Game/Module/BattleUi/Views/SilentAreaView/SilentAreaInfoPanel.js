"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentAreaInfoPanel = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BattleChildView_1 = require("../BattleChildView/BattleChildView"),
	SilentAreaInfoItem_1 = require("./SilentAreaInfoItem");
class SilentAreaInfoPanel extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.Pct = !1),
			(this.xct = void 0),
			(this.TDe = void 0),
			(this.EPe = void 0),
			(this.e4 = []),
			(this.EndShow = () => {
				this.TDe && TimerSystem_1.TimerSystem.Remove(this.TDe),
					this.EPe.StopCurrentSequence(),
					this.EPe?.PlayLevelSequenceByName("Close");
			});
	}
	Initialize(e) {
		super.Initialize(e);
	}
	async InitializeAsync() {
		var e = this.GetItem(1),
			t = new SilentAreaInfoItem_1.SilentAreaInfoItem();
		await t.CreateByActorAsync(e.GetOwner()), this.e4.push(t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.RootItem?.SetAnchorOffsetX(0),
			this.RootItem?.SetAnchorOffsetY(0),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.EPe.BindSequenceCloseEvent((e) => {
				"Close" === e && this.SetActive(!1);
			});
	}
	CreateAndShow(e, t, i) {
		this.Pct
			? (this.UpdateInfo(i), this.SetActive(!0), this.wct())
			: this.NewByResourceId(t, e).finally(() => {
					(this.Pct = !0), this.UpdateInfo(i), this.wct();
				});
	}
	OnShowBattleChildView() {
		this.EPe.StopCurrentSequence(), this.EPe.PlaySequencePurely("Start");
	}
	UpdateInfo(e) {
		(this.xct = e), this.Pct && this.Bct();
	}
	Bct() {
		if (this.xct) {
			const i = this.xct.ShowInfo.InformationConfig;
			for (let n = 0; n < i.length; n++) {
				var e,
					t = i[n];
				let s;
				n < this.e4.length
					? (s = this.e4[n]).UpdateItem(t)
					: ((e = LguiUtil_1.LguiUtil.CopyItem(
							this.GetItem(1),
							this.GetItem(0),
						)),
						(s = new SilentAreaInfoItem_1.SilentAreaInfoItem()).Initialize(
							e.GetOwner(),
							t,
						),
						this.e4.push(s));
			}
			this.e4.forEach((e, t) => {
				e.SetActive(t < i.length);
			});
		}
	}
	wct() {
		this.TDe = TimerSystem_1.TimerSystem.Delay(this.EndShow, 8e3);
	}
}
exports.SilentAreaInfoPanel = SilentAreaInfoPanel;
