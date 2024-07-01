"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionInitHit = exports.SELF_NUMBER = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BulletActionBase_1 = require("./BulletActionBase"),
	FRIEND_NUMBER = ((exports.SELF_NUMBER = 1), 2),
	TEAM_NUMBER = 3,
	ENEMY_NUMBER = 4,
	PLAYER_GROUP_NUMBER = 11,
	campNumbers = [exports.SELF_NUMBER, FRIEND_NUMBER, 4, 3, 11],
	collisionChannelToObjectTypeQueryMap = new Map([
		[
			QueryTypeDefine_1.KuroCollisionChannel.Pawn,
			QueryTypeDefine_1.KuroObjectTypeQuery.Pawn,
		],
		[
			QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
			QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
		],
		[
			QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
			QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
		],
	]);
class BulletActionInitHit extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		var e,
			n = this.BulletInfo.BulletDataMain;
		(this.BulletInfo.CountByParent = n.Base.ShareCounter),
			this.BulletInfo.CountByParent &&
				((e = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
					this.BulletInfo.ParentEntityId,
				))
					? (e = e.GetBulletInfo()) &&
						(((this.BulletInfo.ParentBulletInfo =
							e).NeedNotifyChildrenWhenDestroy = !0),
						e.ChildEntityIds || (e.ChildEntityIds = []),
						e.ChildEntityIds.push(this.BulletInfo.BulletEntityId))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Bullet",
							18,
							"子弹勾选了共享父子弹次数，但是生成时没有父子弹",
							["BulletEntityId", this.BulletInfo.BulletEntityId],
							["BulletRowName", this.BulletInfo.BulletRowName],
						)),
			n.Base.DaHitTypePreset
				? (this.BulletInfo.BulletCamp = n.Base.BulletCamp)
				: (this.BulletInfo.BulletCamp = campNumbers[n.Base.HitType]),
			this.Z4o();
	}
	Z4o() {
		var e,
			n,
			l = this.e5o();
		l !== QueryTypeDefine_1.KuroCollisionChannel.Pawn &&
			((e = this.BulletInfo.CollisionInfo),
			4 & this.BulletInfo.BulletCamp ||
				((n =
					QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer +
					QueryTypeDefine_1.KuroCollisionChannel.PawnMonster -
					l),
				e.IgnoreChannels.add(n),
				e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(n))),
			3 & this.BulletInfo.BulletCamp ||
				(e.IgnoreChannels.add(l),
				e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(l))),
			this.BulletInfo.BulletCamp === exports.SELF_NUMBER) &&
			((n = QueryTypeDefine_1.KuroCollisionChannel.Pawn),
			e.IgnoreChannels.add(n),
			e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(n)));
	}
	e5o() {
		return 0 === this.BulletInfo.AttackerCamp
			? QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer
			: 1 === this.BulletInfo.AttackerCamp
				? QueryTypeDefine_1.KuroCollisionChannel.PawnMonster
				: QueryTypeDefine_1.KuroCollisionChannel.Pawn;
	}
}
exports.BulletActionInitHit = BulletActionInitHit;
