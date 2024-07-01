"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleDefendCreatureView = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BattleEntityChildView_1 = require("../BattleChildView/BattleEntityChildView");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
class BattleDefendCreatureView extends BattleEntityChildView_1.BattleEntityChildView {
	constructor() {
		super(...arguments),
			(this.A_t = (e, t, i) => {
				var r, n;
				this.IsValid() &&
					((r = (n = this.GetEntity().GetComponent(156)).GetCurrentValue(
						EAttributeId.Proto_Life,
					)),
					(n = n.GetCurrentValue(EAttributeId.Tkn)),
					this.P_t(0 < n ? r / n : 0));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UIItem],
		];
	}
	Initialize(e) {
		super.Initialize(e),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(0),
				"InstanceDungeonDefendCreatureTips",
			),
			this.GetText(2).SetUIActive(!1),
			this.GetItem(5).SetUIActive(!1),
			this.P_t(1);
	}
	Reset() {
		super.Reset();
	}
	AddEntityEvents(e) {
		this.ListenForAttributeChanged(e, EAttributeId.Proto_Life, this.A_t);
	}
	P_t(e) {
		(e = (e * CommonDefine_1.PERCENTAGE_FACTOR).toFixed(0)),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(1),
				"InstanceDungeonDefendCreatureNumber",
				e + "%",
			);
	}
}
exports.BattleDefendCreatureView = BattleDefendCreatureView;
